import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MinioModule } from 'nestjs-minio-client';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import mqttConfig from 'src/configs/mqtt';

@Module({
  imports: [
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
  exports: [StorageService],
})
export class StorageModule {}
