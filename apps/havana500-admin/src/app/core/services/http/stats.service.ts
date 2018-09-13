import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { BaseCrudService } from '../../../shared/services/base-crud.service';



import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StatsService extends BaseCrudService<number> { 

  constructor(private httpClient: HttpClient) {
    super(environment.apiUrl + 'stats', httpClient);
  }

    getArticleCount(amountOfDays: number) : Observable<number> {
        return  this.http.get<number>(`${this.url}/GetTotalNewArticles/?lastDays=${amountOfDays}`)
            .pipe(catchError(this.handleError));      
      }

      getActiveArticlesCount(amountOfDays: number) : Observable<number> {
        return  this.http.get<number>(`${this.url}/GetTotalActiveArticles/?lastDays=${amountOfDays}`)
            .pipe(catchError(this.handleError));      
      }

      getCommentsCount(amountOfDays: number) : Observable<number> {
        return  this.http.get<number>(`${this.url}/GetTotalNewComments/?lastDays=${amountOfDays}`)
            .pipe(catchError(this.handleError));      
      }

      getApprovedCommentsCount(amountOfDays: number) : Observable<number> {
        return  this.http.get<number>(`${this.url}/GetTotalApprovedComments/?lastDays=${amountOfDays}`)
            .pipe(catchError(this.handleError));      
      }
      getNotApprovedCommentsCount(amountOfDays: number) : Observable<number> {
        return  this.http.get<number>(`${this.url}/GetTotalNotApprovedComments/?lastDays=${amountOfDays}`)
            .pipe(catchError(this.handleError));      
      }
}