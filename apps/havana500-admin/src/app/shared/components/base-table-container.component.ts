import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge } from 'rxjs';
import {
  BaseEntity,
  BaseDataSource,
  BaseCrudService
} from '@hav500workspace/shared';

export abstract class BaseTableContainerComponent<T extends BaseEntity<any>>
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  protected paginator: MatPaginator;

  @ViewChild(MatSort)
  protected sort: MatSort;
  public dataSource: BaseDataSource<T>;

  constructor(
    public columnsToDisplay: string[],
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
