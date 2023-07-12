import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import * as Sentry from '@sentry/node';
import { EnvironmentNames as EnvNames } from '../configs/env';

const sampleRateLevel = (envName?: string) => {
  const defaultSampleRateLevel = 0;

  if (envName?.includes(EnvNames.local)) return 0;
  if (envName?.includes(EnvNames.develop)) return 0.5;
  if (envName?.includes(EnvNames.staging)) return 0.25;
  if (envName?.includes(EnvNames.production)) return 0.05;

  return defaultSampleRateLevel;
};

Sentry.setContext('status', {
  uptime: process.uptime(),
});

export const SentryConfigModule = SentryModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: async (configService: ConfigService) => {
    const sentryDsn = configService.get('SENTRY_DSN');
    const envName = configService.get('ENV_NAME');
    const tracesSampleRate = sampleRateLevel(envName);

    return {
      dsn: sentryDsn,
      environment: envName,
      tracesSampleRate,
      integrations: [
        new Sentry.Integrations.Console(),
        new Sentry.Integrations.OnUncaughtException(),
        new Sentry.Integrations.OnUnhandledRejection(),
      ],
      logLevels: ['error'],
      enabled: envName !== EnvNames.local,
    };
  },
});
