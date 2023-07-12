import { Catch, Controller, Get, Inject, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TopicForSubscriptionCollection } from '../../configs/env';
import { ExampleDto } from '../../dtos/example/example-dto';

@Catch()
@Controller('/example')
export class ExampleController {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private _logger: Logger) {}

  @MessagePattern(TopicForSubscriptionCollection.example)
  public handle(@Payload() request: ExampleDto, @Ctx() context: MqttContext): string {
    const myExampleResponse = 'Hello World!';

    this._logger.log(request, context, myExampleResponse);
    return myExampleResponse;
  }
}
