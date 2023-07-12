import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecord, MqttRecordBuilder } from '@nestjs/microservices';
import { MqttConfigSymbol } from '../../configs/mqtt';
import { IMqttClientService } from './mqtt-client.interface';

@Injectable()
export class MqttClientService implements IMqttClientService {
  constructor(@Inject(MqttConfigSymbol) readonly _client: ClientProxy) {}

  onModuleInit() {
    return this._client.connect();
  }

  send<Message>(channel: string, message: Message) {
    const record = new MqttRecordBuilder<Message>(message).setRetain(false).setQoS(0).build();

    return this._client.emit<string, MqttRecord<Message>>(channel, record);
  }
}
