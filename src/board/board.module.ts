import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { BoardController } from './board.controller';
import { Article } from './board.entity';
import { BoardService } from './board.service';

@Module({
  // 매우 중요: 서비스에서 사용할 리포지토리 사용을 imports에 명시!
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [BoardController],
  providers: [BoardService, ArticleRepository]
})
export class BoardModule {}
