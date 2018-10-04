import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentHomeComponent } from './comment-home/comment-home.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CommentHomeComponent, CommentComponent]
})
export class CommentHomeModule { }
