import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateArticleDto } from './create-article.dto';
import { DeleteArticleDto } from './delete-article-dto';
import { UpdateArticleDto } from './update-article.dto';

@Controller('board') // routing path is '/board' => localhost:5000/board
export class BoardController {
  // 1. 서비스 주입하기
  constructor(private readonly boardService: BoardService) {}

  // 2. 게시글 목록을 가져오는 API
  @Get('/articles')
  getArticles() {
    return this.boardService.getArticles();
  }

  // 3. 게시글 상세조회 => 게시글 ID로 확인
  @Get('/articles/:id')
  getArticleById(@Param('id') articleId: number) { // 원래는 string
    // class-validator / class-transformer
    return this.boardService.getArticleById(articleId);
  }

  // 4. 게시글 작성
  @Post('/articles')
  createArticle(@Body() data: CreateArticleDto) {
    return this.boardService.createArticle(
      data.title,
      data.content,
      data.password,
    );
  }

  // 5. 게시글 수정
  @Put('/articles/:id')
  updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
  ) {
    return this.boardService.updateArticle(
      articleId,
      data.title,
      data.content,
      data.password,
    );
  }

  // 6. 게시글 삭제
  @Delete('articles/:id')
  deleteArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto,
  ) {
    return this.boardService.deleteArticle(articleId, data.password);
  }
}
