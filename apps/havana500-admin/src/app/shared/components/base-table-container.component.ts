import { BaseCrudService } from './../services/base-crud.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BaseEntity } from '../models/base-entity.model';
import { Entity } from '../models/entity.models';
import { MatPaginator, MatSort } from '@angular/material';
import { BaseDataSource } from '../utils/base-data-source';
import { Article } from '../../core/models/article.model';
import { merge } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BaseResolverService } from '../services/base-resolver.service';

export abstract class BaseTableContainerComponent<T extends BaseEntity<any>>
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  protected paginator: MatPaginator;

  @ViewChild(MatSort)
  protected sort: MatSort;
  protected dataSource: BaseDataSource<T>;

  constructor(
    protected columnsToDisplay: string[],
    protected service: BaseCrudService<T>
  ) {}

  ngOnInit() {
    this.dataSource = new BaseDataSource<T>(this.service);

    this.dataSource.loadData(
      'id',
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).subscribe(() =>
      this.loadPage()
    );
  }

  protected loadPage(): void {
    this.dataSource.loadData(
      this.sort.active,
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
