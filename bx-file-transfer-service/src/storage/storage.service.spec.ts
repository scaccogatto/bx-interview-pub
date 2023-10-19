import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { MinioModule } from 'nestjs-minio-client';
import { loggerConfig } from '../configs/logger';
import mqttConfig from '../configs/mqtt';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  const bucket = 'test-bucket';

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

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should write and read a file', async () => {
    await service.putObject(Buffer.from('test'), 'test', bucket);
    const obj = await service.getObject(bucket, 'test');

    expect(obj.read().toString()).toBe('test');
  });

  it('should start streaming to mqtt', async () => {
    const wait = await new Promise((resolve, reject) => {
      service.getChunksStreamFromObjectName(bucket, 'test').subscribe({
        complete: () => {
          resolve(true);
        },
        error: () => {
          reject(false);
        },
      });
    });

    expect(wait).toBeTruthy();
  });
});
