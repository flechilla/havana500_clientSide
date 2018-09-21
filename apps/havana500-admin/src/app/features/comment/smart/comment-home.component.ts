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
  MatInput,
  MatDialog
} from '@angular/material';
import { Observable, BehaviorSubject, from, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { antAnimations } from '../../../shared/utils/animations';
import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/http/article.service';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { BaseDataSource } from '../../../shared/utils/base-data-source';
import { BaseTableContainerComponent } from '../../../shared/components/base-table-container.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SectionService } from '../../../core/services/http/section.service';
import { Section } from '../../../core/models/section.model';
import { ArticleCommentsInfo } from '../../../core/models/articleCommentsInfo';
import { CommentService } from '../../../core/services/http/comment.service';
import { ArticleCommentsInfoService } from '../../../core/services/http/article-comments-info.service';

@Component({
  selector: 'ant-comment-home',
  templateUrl: 'comment-home.component.html',
  styleUrls: ['comment-home.component.scss'],
  animations: [antAnimations]
  // encapsulation: ViewEncapsulation.None
})
export class CommentHomeComponent
  implements OnInit {
  protected dialogRef: any;
  protected columnsToDisplay: string[] = ['id', 'title', 'amountOfComments', 'startDateUtc'];  

    private articleCommentsInfos: ArticleCommentsInfo[];

  constructor(
    private commentService: CommentService,
    private articleCommentsInfoService: ArticleCommentsInfoService,
    protected dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.articleCommentsInfoService.getArticlesWithNewCommentsInfo(5000)
      .subscribe(result => {this.articleCommentsInfos = result; console.log(this.articleCommentsInfos);});
  }

 
}
