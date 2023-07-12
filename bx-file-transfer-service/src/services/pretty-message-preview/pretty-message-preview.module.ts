import { Module } from '@nestjs/common';
import { PrettyMessagePreviewServiceProvider } from './pretty-message-preview.provider';

@Module({
  imports: [],
  providers: [PrettyMessagePreviewServiceProvider],
  exports: [PrettyMessagePreviewServiceProvider],
})
export class PrettyMessagePreviewModule {}
