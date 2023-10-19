import { Controller, HttpCode, Inject, InternalServerErrorException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, EventPattern, MqttContext, Payload } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Topics } from '../configs/env';
import { StorageStartStreamResponseDto } from './dto/storage-start-stream-response.dto';
import { ParseBufferPipe } from './pipes/parse-buffer.pipe';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly loggerService: Logger,
    private readonly configService: ConfigService,
    private readonly storageService: StorageService,
  ) {}

  @Post(':objName/start-stream')
  @HttpCode(201)
  @ApiResponse({
    type: StorageStartStreamResponseDto,
  })
  async storageStartStream(@Param('objName') objName: string): Promise<StorageStartStreamResponseDto> {
    // TODO: a param to get just some chunks in case of corruption
    // TODO: a streamId for debugging purposes

    this.storageService.getChunksStreamFromObjectName(this.configService.get<string>('BUCKET_NAME'), objName);

    // TODO: catch any error and throw an exception in case
    return { sent: true };
  }

  @EventPattern(`${Topics.uploadTopic}/+`)
  async putObjectChunk(
    @Payload('data', ParseBufferPipe) data: Buffer,
    @Payload('chunk', ParseIntPipe) chunk: number,
    @Ctx() context: MqttContext,
  ) {
    const [, , name] = context.getTopic().split('/');

    // TODO: check for payload size (it should be less than MAX_CHUNK_SIZE)
    // TODO: make a hash and check for file correctness
    // TODO: check for max chunks allowed

    try {
      await this.storageService.putObject(data, `${name}/${chunk}`, this.configService.get<string>('BUCKET_NAME'));
    } catch (e) {
      this.loggerService.error(
        `cannot put${name}/${chunk} into buket ${this.configService.get<string>('BUCKET_NAME')}`,
      );
      throw new InternalServerErrorException(
        `cannot put${name}/${chunk} into buket ${this.configService.get<string>('BUCKET_NAME')}`,
      );
    }
  }
}
