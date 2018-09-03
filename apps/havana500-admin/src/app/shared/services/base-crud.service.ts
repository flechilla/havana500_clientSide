import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AntError } from './../error-handling/ant-error';
import { BadInput } from './../error-handling/bad-input';
import { NotFoundError } from './../error-handling/not-found-error';
import { ServerDown } from './../error-handling/server-down';
import { UnauthorizedError } from './../error-handling/unauthorized-error';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BaseCrudService<T> {
  constructor(public url: string, public http: HttpClient) {}

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url).pipe(catchError(this.handleError));
  }

  public get(id: any, query: string): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http
      .post<T>(this.url + '/GetWithProperties/' + id, query, options)
      .pipe(catchError(this.handleError));
  }

  public create(resource: T): Observable<T> {
    return this.http
      .post<T>(this.url, resource)
      .pipe(catchError(this.handleError));
  }

  public update(id, resource: T): Observable<T> {
    return this.http
      .put<T>(this.url + '/' + id, resource)
      .pipe(catchError(this.handleError));
  }

  public delete(id) {
    return this.http
      .delete<T>(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return Observable.throw(new ServerDown(error));
    }

    if (error.status === 400) {
      return Observable.throw(new BadInput(error));
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error));
    }

    if (error.status === 401) {
      return Observable.throw(new UnauthorizedError(error));
    }

    return Observable.throw(new AntError(error));
  }
}
