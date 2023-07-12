import { Catch, Controller, Get } from '@nestjs/common';

@Catch()
@Controller('/hello-world')
export class HelloWorldController {
  @Get('/')
  public get() {
    return {
      hello: 'world',
    }
  }
}
