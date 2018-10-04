import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@hav500workspace/shared';

@Component({
  selector: 'hav-comment-home',
  templateUrl: './comment-home.component.html',
  styleUrls: ['./comment-home.component.scss']
})
export class CommentHomeComponent implements OnInit {

  // Represents the Article that is the container of the Comments
  @Input() articleId : number;

  private comments : Comment[];

  constructor(private commentService : CommentService){
    console.log(this.articleId);
  }

  ngOnInit(): void {
    this.commentService.getArticleComments(this.articleId, 0, 10).
      subscribe(_comments => this.comments = _comments);
  }

}
