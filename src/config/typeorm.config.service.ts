import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Article } from 'src/board/board.entity';

// Injectable 키워드를 빼놓고 작업하면 DI 에러가 뜨니 꼭 불러오기!!!
@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  // 생성자를 통한 DI
  constructor(private readonly configService : ConfigService){}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // 데이터베이스 설정에 관련된 내용을 적음
      type: 'mysql',
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("DATABASE_PORT"),
      username: this.configService.get<string>("DATABASE_USERNAME"),
      password: this.configService.get<string>("DATABASE_PASSWORD"),
      database: this.configService.get<string>("DATABASE_NAME"),
      entities: [Article],

      // 개발버전에서는 스키마의 용이한 수정을 위함
      synchronize: true,
    };
  }
}
