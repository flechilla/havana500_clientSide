import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@hav500workspace/shared';
import {MatCardModule} from '@angular/material/card';
import {Comment} from '@hav500workspace/shared';

@Component({
  selector: 'hav-comment-home',
  templateUrl: './comment-home.component.html',
  styleUrls: ['./comment-home.component.scss']
})
export class CommentHomeComponent implements OnInit {

  // Represents the Article that is the container of the Comments
  @Input() articleId : number;
  private newComment: Comment;
  

  private comments : Comment[];

  constructor(private commentService : CommentService){
    console.log(this.articleId);
  }

  ngOnInit(): void {
    this.newComment = new Comment(-1, '', '', '');
    this.newComment.articleId = -1;
    this.newComment.userEmail = '';
    this.newComment.userName = '';
    this.newComment.body = '';
    console.log(this.newComment);

    this.commentService.getArticleComments(this.articleId, 0, 10).
      subscribe(_comments => this.comments = _comments);
  }
  /**
   *  Post a new comment to the server and add it to the list of comments.
   *  This will update the DOM automatically.
   */
  postNewComment(): void{
    this.newComment.articleId = this.articleId;
    
    this.commentService.create(this.newComment).
      subscribe(newComment=>{
        this.newComment = newComment
      this.comments.push(this.newComment);
      });

  }

}
