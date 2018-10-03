import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseEntity, PaginationResult } from '../models';
import { BaseCrudService } from '../services';

@Injectable()
export class BaseDataSource<T extends BaseEntity<any>> extends DataSource<T> {
  protected data$: BehaviorSubject<T[]>;

  public currentLength = 0;

  constructor(protected service: BaseCrudService<T>) {
    super();

    this.data$ = new BehaviorSubject([]);
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
    columnName: string = 'id',
    filter = '',
    sortDirection = 'asc',
    pageIndex = 0,
    pageSize = 10
  ) {
    this.service
      .getWithPagAndSort(pageIndex, pageSize, columnName, sortDirection)
      .pipe(catchError(() => of({ entities: [], length: 0 })))
      .subscribe((result: PaginationResult<T>) => {
        this.data$.next(result.entities);
        this.currentLength = result.length;
      });
  }
}
