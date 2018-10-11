import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseTableContainerComponent } from '../../../../shared/components/base-table-container.component';
import { ArticleCommentsInfo } from '../../../../core/models/articleCommentsInfo';
import { ArticleCommentsInfoService } from '../../../../core/services/http/article-comments-info.service';
import { antAnimations } from '@hav500workspace/shared';
import { CommentsAnalyzerComponent } from '../comments-analyzer/comments-analyzer.component';

@Component({
  selector: 'ant-comment-home',
  templateUrl: 'comment-home.component.html',
  styleUrls: ['comment-home.component.scss'],
  animations: [antAnimations]
})
export class CommentHomeComponent
  extends BaseTableContainerComponent<ArticleCommentsInfo>
  implements OnInit, AfterViewInit {
  protected dialogRef: any;

  constructor(
    private articleCommentsInfoService: ArticleCommentsInfoService,
    protected dialog: MatDialog
  ) {
    super(
      ['id', 'title', 'amountOfComments', 'startDateUtc'],
      articleCommentsInfoService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  openCommentsAnalyzerDialog(articleId: number) {
    this.dialogRef = this.dialog.open(CommentsAnalyzerComponent, {
      panelClass: 'comment-analyzer-dialog',
      data: {
        articleId: articleId
      }
    });

  }
}
