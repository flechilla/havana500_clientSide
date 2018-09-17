import { Article } from './../../models/article.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseCrudService } from '../../../shared/services/base-crud.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticleExtended } from '../../models/article-extended';

@Injectable()
export class ArticleService extends BaseCrudService<Article> {
  constructor(private httpClient: HttpClient) {
    super(environment.apiUrl + 'articles', httpClient);
  }

  /**
   * getWithTags
   */
  public getWithTags(id: number): Observable<ArticleExtended> {
    return this.http
      .get<ArticleExtended>(this.url + '/GetArticleWithTags?articleId=' + id)
      .pipe(catchError(this.handleError));
  }
}
