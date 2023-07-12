import { IPrettyMessagePreviewService } from './pretty-message-preview.interface';

export class PrettyMessagePreviewService implements IPrettyMessagePreviewService {
  public makePretty(data: object) {
    const textLengthLimit = 100;

    let prettyMessage = JSON.stringify(data, null, 2);
    if (prettyMessage.length > textLengthLimit) {
      prettyMessage = prettyMessage.slice(0, textLengthLimit) + '...';
    }

    return prettyMessage;
  }
}
