import { NgModule, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentHomeComponent } from './comment-home/comment-home.component';
import { CommentComponent } from './comment/comment.component';
import { CommentModel, CommentService, SharedModule } from '@hav500workspace/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule
  ],
  exports: [
    MatCardModule
  ],
  declarations: [CommentHomeComponent, CommentComponent]
})
export class CommentHomeModule{


}
