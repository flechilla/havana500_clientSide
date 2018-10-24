import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArticleComponent } from '@hav500workspace/shared';
import { ArticleService } from '@hav500workspace/shared';
import { CommentHomeComponent } from '../comment-home/comment-home/comment-home.component';
import { CommentComponent } from '../comment-home/comment/comment.component';
import { FormsModule } from '@angular/forms'; 


@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [
    ArticleComponent,
    CommentHomeComponent,
    CommentComponent
  ],
  providers: []
})
export class ArticleModule { }
