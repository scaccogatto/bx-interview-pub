import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import mqttConfig from '../../configs/mqtt';
import { MqttClientServiceProvider } from './mqtt-client.provider';

@Module({
  imports: [ClientsModule.register([mqttConfig])],
  providers: [MqttClientServiceProvider],
  exports: [MqttClientServiceProvider],
})
export class MqttClientModule {}
