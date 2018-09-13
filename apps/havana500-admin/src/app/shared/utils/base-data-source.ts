import { DataSource } from '@angular/cdk/table';
import { BaseEntity } from '../models/base-entity.model';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { BaseCrudService } from '../services/base-crud.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { MatSort, MatPaginator } from '@angular/material';

@Injectable()
export class BaseDataSource<T extends BaseEntity<any>> extends DataSource<T> {
  protected data$: BehaviorSubject<T[]>;

  public currentLength = 0;

  constructor(protected service: BaseCrudService<T>) {
    super();

    this.data$ = new BehaviorSubject([]);

    this.data$.subscribe(resp => {
      this.currentLength = resp.length;
    });
  }

  get Data$(): Observable<T[]> {
    return this.data$.asObservable();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.data$.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.data$.complete();
  }

  loadData(
    columnName: string,
    filter = '',
    sortDirection = 'asc',
    pageIndex = 0,
    pageSize = 10
  ) {
    this.service
      .getWithPagAndSort(pageIndex, pageSize, columnName, sortDirection)
      .pipe(catchError(() => of([])))
      .subscribe((entities: T[]) => this.data$.next(entities));
  }
}
