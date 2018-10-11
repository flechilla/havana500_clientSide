import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {
  antAnimations,
  CommentService,
  CommentModel
} from '@hav500workspace/shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-comment-analyzer',
  templateUrl: 'comments-analyzer.component.html',
  styleUrls: ['comments-analyzer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: antAnimations
})
export class CommentsAnalyzerComponent implements OnInit {
  comments: CommentModel[];
  currentPage: number;
  pageSize: number;
  articleId: number;

  constructor(
    public dialogRef: MatDialogRef<CommentsAnalyzerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articleId: number },
    protected commentsService: CommentService
  ) {}

  ngOnInit() {
    if (!this.data) {
      console.error('DATA MUST NOT BE NULL');
      this.dialogRef.close();
    }
    this.comments = [];
    this.articleId = this.data.articleId;
    this.currentPage = 0;
    // Show comments from 5 to 5
    this.pageSize = 5;

    this.loadComments();
  }

  loadComments() {
    this.commentsService
      .getArticleComments(this.articleId, this.currentPage, this.pageSize)
      .subscribe((resp: CommentModel[]) => {
        console.log(resp);

        if (resp) this.comments.push(...resp);
      });

    this.currentPage++;
  }

  approveComment(comment: CommentModel) {
    console.log('APPROVE COMMENT WITH ID: ' + comment.id);
    this.commentsService
      .update(comment.id, { ...comment, isApproved: true })
      .subscribe((resp: CommentModel) => {
        comment = resp;

        const index = this.comments.findIndex(com => com.id === resp.id);
        this.comments.splice(index, 1);
      });
  }

  dennyComment(comment: CommentModel) {
    console.log('DENY COMMENT WITH ID: ' + comment.id);
    this.commentsService
      .update(comment.id, { ...comment, isApproved: false })
      .subscribe((resp: CommentModel) => {
        comment = resp;

        const index = this.comments.findIndex(com => com.id === resp.id);
        this.comments.splice(index, 1);
      });
  }
}
