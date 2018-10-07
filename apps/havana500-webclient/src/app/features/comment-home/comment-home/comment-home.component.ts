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

  postNewComment(): void{
    this.newComment.articleId = this.articleId;
    this.commentService.create(this.newComment).
      subscribe(newComment=>{
        this.newComment = newComment
        console.log('inserting new comment with Id: '+this.newComment.id);
      console.log('Total comments before: ' + this.comments.length);
      this.comments.push(this.newComment);
      console.log('Total comments after: ' + this.comments.length);
      });

      
      
    //TODO: insert the new comment in the old comment's list
  }

}
