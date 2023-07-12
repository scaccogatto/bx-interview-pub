import { Observable } from 'rxjs';

export interface IMqttClientService {
  send<Message>(channel: string, message: Message): Observable<string>;
}
