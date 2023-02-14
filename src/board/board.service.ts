import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class BoardService {
  // 원래 Repository를 참조하여 비지니스 로직을 실행하기 위해 데이터베이스와 통신
  // 하지만 편의성을 위하여 인-메모리 변수로 해결

  private articles = [];

  private articlePassword = new Map(); // Map은 {articleId - password}, {articleId - password}, {articleId - password}

  getArticles() {
    return this.articles;
  }

  getArticleById(id: number) {
    return this.articles.find((article) => article.id === id);
  }

  createArticle(title: string, content: string, password: number) {
    // id를 먼저 매겨야 함
    // 1번부터 시작 => 현재 배열의 크기 + 1
    const articleId = this.articles.length + 1;
    this.articles.push({ id: articleId, title, content });
    this.articlePassword.set(articleId, password);
    return articleId;
  }

  updateArticle(id: number, title: string, content: string, password: number) {
    if (this.articlePassword.get(id) !== password) {
      throw new UnauthorizedException('Password is not correct. id :' + id);
    }
    const article = this.getArticleById(id);
    if (_.isNil(article)) {
      throw new NotFoundException('Article is not found. id :' + id);
    }

    article.title = title;
    article.content = content;
  }

  deleteArticle(id: number, password: number) {
    if (this.articlePassword.get(id) !== password) {
      throw new UnauthorizedException('Password is not correct. id :' + id);
    }

    this.articles = this.articles.filter((article) => article.id !== id);
  }
}
