import { Test, TestingModule } from '@nestjs/testing';
import { PrettyMessagePreviewModule } from './pretty-message-preview.module';
import { PRETTY_MESSAGE_PREVIEW_SERVICE_PROVIDER_SYMBOL } from './pretty-message-preview.provider';

describe('PrettyMessagePreview', () => {
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrettyMessagePreviewModule],
    }).compile();
  });

  describe('Check exists right module items', () => {
    it('should be exist PrettyMessagePreviewService in module', async () => {
      const service = await moduleRef.resolve(PRETTY_MESSAGE_PREVIEW_SERVICE_PROVIDER_SYMBOL);
      expect(service.constructor.name).toBe('PrettyMessagePreviewService');
    });
  });
});
