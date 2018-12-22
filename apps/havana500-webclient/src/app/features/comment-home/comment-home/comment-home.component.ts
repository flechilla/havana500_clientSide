import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@hav500workspace/shared';
import { CommentModel } from '@hav500workspace/shared';

@Component({
  selector: 'hav-comment-home',
  templateUrl: './comment-home.component.html',
  styleUrls: ['./comment-home.component.scss']
})
export class CommentHomeComponent implements OnInit {
  // Represents the Article that is the container of the Comments
  @Input()
  articleId: number;
  private newComment: CommentModel;

  private comments: CommentModel[];
  private commentsToRender: CommentModel[];
  private endOfComments: boolean;
  private currentPage = 0;
  private page_size = 10;


  constructor(private commentService: CommentService) {
    console.log(this.articleId);
    this.endOfComments = false;
  }

  ngOnInit(): void {
    this.newComment = new CommentModel(-1, '', '', '');
    this.newComment.articleId = -1;
    this.newComment.userEmail = '';
    this.newComment.userName = '';
    this.newComment.body = '';
    console.log(this.newComment);

    this.commentService
      .getArticleComments(this.articleId, 0, 10)
      .subscribe(_comments => {
        this.commentsToRender = _comments;
          this.endOfComments = _comments.length < this.page_size;

      });
  }

  private loadMoreComments(): void{
    this.commentService
    .getArticleComments(this.articleId, ++this.currentPage, this.page_size)
    .subscribe(_comments => {
      this.commentsToRender = this.commentsToRender.concat(_comments);
      this.endOfComments = _comments.length < this.page_size;
    });
  }
  /**
   *  Post a new comment to the server and add it to the list of comments.
   *  This will update the DOM automatically.
   */
  postNewComment(): void {
    this.newComment.articleId = this.articleId;

    this.commentService.create(this.newComment).subscribe(newComment => {
      this.newComment = newComment;
      this.comments.push(this.newComment);
    });
  }
}
