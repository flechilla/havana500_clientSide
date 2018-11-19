import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ArticleCommentsInfo } from '../../models/articleCommentsInfo';
import { Observable } from 'rxjs';
import { CommentModule } from '../../../features/comment/comment.module';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { BaseCrudService } from '@hav500workspace/shared';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ArticleCommentsInfoService extends BaseCrudService<
  ArticleCommentsInfo
> {
  constructor(private httpClient: HttpClient, protected snack: MatSnackBar) {
    super(environment.apiUrl + 'articles', httpClient, snack);
  }

  /**
   * Returns the amount of new comments per each article
   * @param  {number} daysAgo The amount of days since the comments were added
   * @returns Observable A list with the name of the Article, the Id and the amount of new comments
   */
  getArticlesWithNewCommentsInfo(
    daysAgo: number
  ): Observable<ArticleCommentsInfo[]> {
    const options = daysAgo
      ? { params: new HttpParams().set('daysAgo', daysAgo.toString()) }
      : {};
    return this.httpClient
      .get<ArticleCommentsInfo[]>(
        `${this.url}/GetArticlesWithNewCommentsInfo`,
        options
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  public getWithPagAndSort(
    pageNumber: number,
    pageSize: number,
    columnToSort: string,
    sortDir: string
  ): Observable<ArticleCommentsInfo[]> {
    const daysAgo = 50000;

    return this.http
      .get<ArticleCommentsInfo[]>(
        this.url +
          '/GetArticlesWithNewCommentsInfo?pageNumber=' +
          pageNumber +
          '&pageSize=' +
          pageSize +
          '&columnNameForSorting=' +
          columnToSort +
          '&sortingType=' +
          sortDir +
          '&daysAgo=' +
          daysAgo
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }
}
