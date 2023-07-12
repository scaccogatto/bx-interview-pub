import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import mqttConfig from '../configs/mqtt';
import { MqttClientServiceProvider } from '../services/mqtt-client/mqtt-client.provider';
import { PrettyMessagePreviewServiceProvider } from '../services/pretty-message-preview/pretty-message-preview.provider';

@Module({
  imports: [ClientsModule.register([mqttConfig])],
  providers: [MqttClientServiceProvider, PrettyMessagePreviewServiceProvider],
  exports: [MqttClientServiceProvider, PrettyMessagePreviewServiceProvider],
})
export class MqttModule {
  static forRoot(options?): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: MqttModule,
    };
  }
}
