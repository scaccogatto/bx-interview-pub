import { randomUUID } from 'crypto';
import { Readable } from 'stream';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { BucketItem, UploadedObjectInfo } from 'minio';
import { MinioService } from 'nestjs-minio-client';
import { asyncScheduler, from, map, subscribeOn } from 'rxjs';
import { MAX_CHUNK_SIZE, Topics } from '../configs/env';
import { MqttConfigSymbol } from '../configs/mqtt';

@Injectable()
export class StorageService {
  constructor(
    @Inject(MqttConfigSymbol) private readonly mqttClient: ClientProxy,
    private readonly minio: MinioService,
    private readonly configService: ConfigService,
  ) {}

  private get client() {
    return this.minio.client;
  }

  static generateObjectName(): string {
    return randomUUID({ disableEntropyCache: true });
  }

  static chunksNumberFromSize(size: number): number {
    const maxChunkSize = +MAX_CHUNK_SIZE;
    const chunksCount = Math.ceil(size / maxChunkSize);

    return chunksCount;
  }

  async putObject(
    file: Buffer,
    name: string,
    bucket: string,
  ): Promise<{ url: string; objectInfo: UploadedObjectInfo }> {
    const putObjectResult = await this.client.putObject(bucket, name, file);

    return {
      url: `${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${bucket}/${name}`,
      objectInfo: putObjectResult,
    };
  }

  async getObject(bucket: string, objectName: string): Promise<Readable> {
    const fileStream = await this.client.getObject(bucket, objectName);
    return fileStream;
  }

  listObjects(bucket: string, objectName: string) {
    return this.client.listObjects(bucket, objectName, true);
  }

  getChunksStreamFromObjectName(bucket: string, objName: string) {
    const objectStream = this.listObjects(bucket, objName);

    const stream = from(objectStream)
      .pipe(subscribeOn(asyncScheduler))
      .pipe(
        map(async (bucketItem: BucketItem) => ({
          buffer: await this.getObject(bucket, bucketItem.name),
          chunk: bucketItem.name.split('/').slice(-1)[0],
        })),
      )
      .pipe(
        map(async (element: Promise<{ buffer: Readable; chunk: string }>) => {
          const { buffer, chunk } = await element;

          return this.mqttClient
            .emit(`${Topics.downloadTopic}/${objName}`, { buffer: buffer.read(), chunk: +chunk })
            .subscribe();
        }),
      );

    stream.subscribe();
    return stream;
  }
}
