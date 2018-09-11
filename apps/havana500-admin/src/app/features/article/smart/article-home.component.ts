import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  Input,
  AfterViewInit
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatInput
} from '@angular/material';
import { Observable, BehaviorSubject, from, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { antAnimations } from '../../../shared/utils/animations';
import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/http/article.service';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { BaseDataSource } from '../../../shared/utils/base-data-source';

@Component({
  selector: 'ant-article-home',
  templateUrl: 'article-home.component.html',
  styleUrls: ['article-home.component.scss'],
  animations: [antAnimations]
  // encapsulation: ViewEncapsulation.None
})
export class ArticleHomeComponent implements OnInit, AfterViewInit {
  dataSource: BaseDataSource<Article>;


  displayedColumns = [
    'id',
    'title',
    'section',
    'allowComments',
    'allowAnonymousComments',
    'approvedCommentCount',
    'notApprovedCommentCount',
    'views'
    // 'amountOfComments'
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(protected service: ArticleService) {}

  ngOnInit() {
    this.dataSource = new BaseDataSource<Article>(this.service);
    this.dataSource.loadData(
      'Id',
      '',
      this.sort.direction,
      0,
      this.paginator.pageSize
    );
  }

  // public applyFilter(event$: Observable<any>) {
  //   event$
  //     .pipe(
  //       debounceTime(150),
  //       distinctUntilChanged()
  //     )
  //     .subscribe(resp => {
  //       // if (!this.dataSource) {
  //       //   return;
  //       // }
  //       // this.dataSource.filter = resp.target.value;
  //       console.log(resp.target.value);
  //     });
  // }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).subscribe(() =>
      this.loadPage()
    );
  }

  loadPage() {
    this.dataSource.loadData(
      this.sort.active,
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
