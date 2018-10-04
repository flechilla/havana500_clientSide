import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HavanaEnvironment } from '../../models';
import { BaseCrudService } from '../base';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CommentService extends BaseCrudService<Comment> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient
  ) {
    super(environment.apiUrl + 'comments', httpClient);
  }

  public getArticleComments(
    articleId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(
        this.url +
          '/GetArticleComments?pageNumber=' +
          pageNumber +
          '&pageSize=' +
          pageSize +
          '&articleId=' + articleId
      )
      .pipe(catchError(this.handleError));
  }
}
