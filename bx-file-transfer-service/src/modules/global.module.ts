import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from '../configs/logger';
import { SentryConfigModule } from './sentry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(loggerConfig),
    SentryConfigModule,
  ],
  controllers: [],
  providers: [],
  exports: [WinstonModule, SentryConfigModule, ConfigModule],
})
export class GlobalModule {
  static forRoot(options?): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: GlobalModule,
    };
  }
}
