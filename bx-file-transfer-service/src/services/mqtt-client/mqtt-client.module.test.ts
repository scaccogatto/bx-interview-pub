import { Test, TestingModule } from '@nestjs/testing';
import { MqttClientModule } from './mqtt-client.module';
import { MQTT_CLIENT_SERVICE_PROVIDER_SYMBOL } from './mqtt-client.provider';

describe('MqttClient', () => {
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [MqttClientModule],
    }).compile();
  });

  describe('Check exists right module items', () => {
    it('should be exist MqttClientService in module', async () => {
      const service = await moduleRef.resolve(MQTT_CLIENT_SERVICE_PROVIDER_SYMBOL);
      expect(service.constructor.name).toBe('MqttClientService');
    });
  });
});
