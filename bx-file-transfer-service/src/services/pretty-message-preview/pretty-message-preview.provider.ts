import { Provider } from '@nestjs/common';
import { PrettyMessagePreviewService } from './pretty-message-preview.service';

export const PRETTY_MESSAGE_PREVIEW_SERVICE_PROVIDER_SYMBOL = Symbol.for('PrettyMessagePreviewService');

export const PrettyMessagePreviewServiceProvider: Provider = {
  provide: PRETTY_MESSAGE_PREVIEW_SERVICE_PROVIDER_SYMBOL,
  useClass: PrettyMessagePreviewService,
};
