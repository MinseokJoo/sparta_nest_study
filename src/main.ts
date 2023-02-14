import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
//nest.js에서 웹어플리케이션을 생성할 때 자동으로 생성되는 앱 모듈
import { AppModule } from './app.module';

async function bootstrap() {
  //nest.js에서 웹어플리케이션을 생성하는 함수 (앱 모듈이라는 모듈을 루트 모듈로 사용하는 nest.js 어플리케이션 인스턴스를 생성해달라!!)
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // 유효성 검사를 하기 위해 꼭 추가하기!!
  await app.listen(3000);
}
bootstrap();
