import { SentryService } from '@ntegral/nestjs-sentry';
import { ValidationError } from 'class-validator';
import { Logger } from 'winston';

export function validationErrorsMonitor(
  loggerService: Logger,
  sentryService: SentryService,
  errorPrefix: string,
  errors: ValidationError[],
) {
  loggerService.log(errorPrefix, errors);
  sentryService.instance().captureException(errors);
}
