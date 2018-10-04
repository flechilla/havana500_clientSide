import { NgModule, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentHomeComponent } from './comment-home/comment-home.component';
import { CommentComponent } from './comment/comment.component';
import { Comment, CommentService } from '@hav500workspace/shared';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CommentHomeComponent, CommentComponent]
})
export class CommentHomeModule{


}
