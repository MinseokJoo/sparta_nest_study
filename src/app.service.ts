import { Injectable } from '@nestjs/common';

// AppService 가 나를 필요로 하묜  언제든지 DI를 통해서 나를 써봐라~
@Injectable()
// AppService와 같은 서비스 객체는 실제로 Repository를 의존하며 비지니스 로직 실행을 담당
// Service는 Repository를 반드시 의존해야 하며 이는 생성자를 통한 DI로 해결 (데이터베이스를 사용하는 경우에만 해당)
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
