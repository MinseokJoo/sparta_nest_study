import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import _ from 'lodash';
import { ArticleRepository } from './article.repository';

@Injectable()
export class BoardService {
  constructor(
    private articleRepository: ArticleRepository,
  ) {}

  async getArticles() {
    return await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['id', 'author', 'title', 'createdAt'],
    });
  }

  async getArticleById(id: number) {
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['author', 'title', 'content', 'createdAt', 'updatedAt'],
    });
  }

  async getHotArticles() {
    return await this.articleRepository.getArticlesByViewCount()
  }

  // create는 async await 안한 이유는
  // 위에 두 get은 find를 해서 목록을 받아오는 걸 보장해야하지만
  // create는 호출한 뒤 호출했는 지 응답을 굳이 안받아도 됨
  createArticle(title: string, content: string, password: number) {
    this.articleRepository.insert({
      author: 'test',
      title,
      content,
      password: password.toString(),
    });
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    password: number,
  ) {
    await this.verifyPassword(id, password);

    this.articleRepository.update(id, { title, content });
  }

  async deleteArticle(id: number, password: number) {
    await this.verifyPassword(id, password);

    this.articleRepository.softDelete(id);
  }

  private async verifyPassword(id: number, password: number) {
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });

    if (_.isNil(article)) {
      throw new NotFoundException('Article is not found. id :' + id);
    }

    if (article.password !== password.toString()) {
      return new UnauthorizedException(`Password is not corrected. id : ${id}`);
    }
  }
}
