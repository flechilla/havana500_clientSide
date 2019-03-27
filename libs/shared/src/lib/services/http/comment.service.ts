import { MatSnackBar } from '@angular/material';
import { CommentModel } from './../../models/comment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HavanaEnvironment } from '../../models';
import { BaseCrudService } from '../base';
import { Observable } from 'rxjs';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { retryBackoff } from 'backoff-rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService extends BaseCrudService<CommentModel> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient,
    protected snack: MatSnackBar
  ) {
    super(environment.apiUrl + 'comments', httpClient, snack);
  }

  public getArticleComments(
    articleId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<CommentModel[]> {
    return this.http
      .get<CommentModel[]>(
        this.url +
          '/GetArticleComments?pageNumber=' +
          pageNumber +
          '&pageSize=' +
          pageSize +
          '&articleId=' +
          articleId
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        }),
        retryBackoff(this.retryConfig)
      );
  }

  
  public getArticleCommentsForUsers(
    articleId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<CommentModel[]> {
    return this.http
      .get<CommentModel[]>(
        this.url +
          '/GetArticleCommentsForUsers?pageNumber=' +
          pageNumber +
          '&pageSize=' +
          pageSize +
          '&articleId=' +
          articleId
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        }),
        retryBackoff(this.retryConfig)
      );
  }
}
