import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { MQTT_URL } from './env';

export const MqttConfigSymbol = Symbol.for('mqttConfig');

export const mqttConfig: ClientProviderOptions = {
  name: MqttConfigSymbol,
  transport: Transport.MQTT,
  options: {
    url: MQTT_URL,
    protocolVersion: 5,
  },
};

export default mqttConfig;
