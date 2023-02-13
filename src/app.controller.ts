import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 컨트롤러로서의 역할을 수행하겠다. => nest.js에게 말함
export class AppController {
  // DI 의존성 주입, 생성자의 매개변수로만 지정하면 됨
  constructor(private readonly appService: AppService) {}

  @Get() // HTTP METHOD GET
  getHello(): string {
    return this.appService.getHello();
  }
}
