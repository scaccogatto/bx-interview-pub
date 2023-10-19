import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, MqttContext } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { MinioModule } from 'nestjs-minio-client';
import { loggerConfig } from '../configs/logger';
import mqttConfig from '../configs/mqtt';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

describe('StorageController', () => {
  let controller: StorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRoot(loggerConfig),
        ConfigModule,
        ClientsModule.register([mqttConfig]),
        MinioModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            return {
              endPoint: config.get<string>('MINIO_ENDPOINT'),
              port: +config.get<string>('MINIO_PORT'),
              useSSL: config.get<string>('MINIO_SSL') === 'true',
              accessKey: config.get<string>('MINIO_ACCESS_KEY'),
              secretKey: config.get<string>('MINIO_SECRET_KEY'),
            };
          },
        }),
      ],
      controllers: [StorageController],
      providers: [StorageService],
    }).compile();

    controller = module.get<StorageController>(StorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should put an object chunk', async () => {
    const ctx = new MqttContext(['test', []]);
    const res = await controller.putObjectChunk(Buffer.from('test'), 0, ctx);

    expect(res).toBe(undefined);
  });

  it('should start an object stream', async () => {
    const res = await controller.storageStartStream('test');
    expect(res.sent).toBeTruthy();
  });
});
