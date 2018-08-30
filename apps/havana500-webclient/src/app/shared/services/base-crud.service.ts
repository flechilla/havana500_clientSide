import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FetchData } from '../../core/models/fetch-data.model';
import { FetchResult } from '../../core/models/fetch-result.model';
import { AntError } from './../error-handling/ant-error';
import { BadInput } from './../error-handling/bad-input';
import { NotFoundError } from './../error-handling/not-found-error';
import { ServerDown } from './../error-handling/server-down';
import { UnauthorizedError } from './../error-handling/unauthorized-error';

@Injectable()
export class BaseCrudService<T> {
  constructor(public url: string, public http: HttpClient) {}

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url).catch(this.handleError);
  }

  public get(id: any, query: string): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http
      .post<T>(this.url + '/GetWithProperties/' + id, query, options)
      .catch(this.handleError);
  }

  public create(resource: T): Observable<T> {
    return this.http.post<T>(this.url, resource).catch(this.handleError);
  }

  public update(id, resource: T): Observable<T> {
    return this.http
      .put<T>(this.url + '/' + id, resource)
      .catch(this.handleError);
  }

  public delete(id) {
    return this.http.delete<T>(this.url + '/' + id).catch(this.handleError);
  }

  public getAllDependents(id: any, dependentName: string): Observable<any[]> {
    return this.http
      .get<any[]>(this.url + '/GetAllDependentIds/' + id + '/' + dependentName)
      .catch(this.handleError);
  }

  public addWeakDependent(
    id: any,
    dependentName: string,
    dependentId: any
  ): Observable<any> {
    return this.http
      .patch(
        this.url + '/' + id + '/' + dependentName + '/add/' + dependentId,
        null
      )
      .catch(this.handleError);
  }

  public deleteWeakDependent(
    id: any,
    dependentName: string,
    dependentId: any
  ): Observable<any> {
    return this.http
      .patch(
        this.url + '/' + id + '/' + dependentName + '/delete/' + dependentId,
        null
      )
      .catch(this.handleError);
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
