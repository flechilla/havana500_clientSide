import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { BaseEntity } from '../models/base-entity.model';
import { Observable } from 'rxjs';
import { BaseCrudService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseResolverService<T extends BaseEntity<any>>
  extends BaseCrudService<T>
  implements Resolve<T[]> {
  constructor(public url: string, public http: HttpClient) {
    super(url, http);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<T[]> {
    return this.getAll();
  }
}
