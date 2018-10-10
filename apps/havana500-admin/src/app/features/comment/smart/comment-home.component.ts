import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseTableContainerComponent } from '../../../shared/components/base-table-container.component';
import { ArticleCommentsInfo } from '../../../core/models/articleCommentsInfo';
import { ArticleCommentsInfoService } from '../../../core/services/http/article-comments-info.service';
import { antAnimations } from '@hav500workspace/shared';

@Component({
  selector: 'ant-comment-home',
  templateUrl: 'comment-home.component.html',
  styleUrls: ['comment-home.component.scss'],
  animations: [antAnimations]
  // encapsulation: ViewEncapsulation.None
})
export class CommentHomeComponent
  extends BaseTableContainerComponent<ArticleCommentsInfo>
  implements OnInit, AfterViewInit {
  constructor(private articleCommentsInfoService: ArticleCommentsInfoService) {
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
}
