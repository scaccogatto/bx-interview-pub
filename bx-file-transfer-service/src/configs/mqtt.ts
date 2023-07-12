import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { APP_NAME, MQTT_PASSWORD, MQTT_URL, MQTT_USERNAME } from './env';

export const MqttConfigSymbol = Symbol.for('mqttConfig');

export const mqttConfig: ClientProviderOptions = {
  name: MqttConfigSymbol,
  transport: Transport.MQTT,
  options: {
    url: MQTT_URL,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtt',
    clientId: APP_NAME,
  },
};

export default mqttConfig;
