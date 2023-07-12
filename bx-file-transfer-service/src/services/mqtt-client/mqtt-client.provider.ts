import { Provider } from '@nestjs/common';
import { MqttClientService } from './mqtt-client.service';

export const MQTT_CLIENT_SERVICE_PROVIDER_SYMBOL = Symbol.for('MqttClientService');

export const MqttClientServiceProvider: Provider = {
  provide: MQTT_CLIENT_SERVICE_PROVIDER_SYMBOL,
  useClass: MqttClientService,
};
