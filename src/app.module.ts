import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeormConfigService } from './config/typeorm.config.service';
import { UserModule } from './user/user.module';

// @가 붙는 키워드를 데코레이터라고 함, 데코레이터는 해당 클래스나 함수가 어떤 역할을 수행하는 지 nestjs에게 알려주는 것
@Module({ 
  // imports는 이 모듈을 사용하기 위해서 어떤 걸 가져오겠다! 보통 여기에 들어가는 것은 서비스를 exports 하는 모듈이 들어온다. ex) http 모듈, typeORM모듈 등등
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    // 제일 먼저 보이는 모듈에 데이터베이스 접속 정보가 노출되기 때문에 nestjs/config로 감춤
    TypeOrmModule.forRootAsync({useClass : TypeormConfigService}),
    BoardModule,
    UserModule
  ], 
  // controllers는 이 모듈은 어떤 컨트롤러를 쓰겠다.
  controllers: [AppController], 
  // providers는 해당 모듈에서 써야한 서비스를 정의하는 것
  providers: [AppService], 
})
export class AppModule {} // AppModule가 nestjs 웹어플리케이션에서는 모듈이라는 역할을 할거야!!
