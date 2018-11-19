import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { BaseCrudService } from '@hav500workspace/shared';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '@hav500workspace/shared';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class StatsService extends BaseCrudService<number> {
  constructor(private httpClient: HttpClient, protected snack: MatSnackBar) {
    super(environment.apiUrl + 'stats', httpClient, snack);
  }

  getArticleCount(amountOfDays: number): Observable<number> {
    return this.http
      .get<number>(`${this.url}/GetTotalNewArticles/?lastDays=${amountOfDays}`)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  getActiveArticlesCount(amountOfDays: number): Observable<number> {
    return this.http
      .get<number>(
        `${this.url}/GetTotalActiveArticles/?lastDays=${amountOfDays}`
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  getCommentsCount(amountOfDays: number): Observable<number> {
    return this.http
      .get<number>(`${this.url}/GetTotalNewComments/?lastDays=${amountOfDays}`)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  getApprovedCommentsCount(amountOfDays: number): Observable<number> {
    return this.http
      .get<number>(
        `${this.url}/GetTotalApprovedComments/?lastDays=${amountOfDays}`
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }
  getNotApprovedCommentsCount(amountOfDays: number): Observable<number> {
    return this.http
      .get<number>(
        `${this.url}/GetTotalNotApprovedComments/?lastDays=${amountOfDays}`
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  getTrendingArticles(amountOfDays: number): Observable<Article[]> {
    return this.http
      .get<Article[]>(
        `${this.url}/GetTrendingArticles/?lastDays=${amountOfDays}`
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
