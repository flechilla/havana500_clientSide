import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArticleComponent } from '@hav500workspace/shared';
import { ArticleService } from '@hav500workspace/shared';
import { CommentHomeComponent } from '../comment-home/comment-home/comment-home.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    ArticleComponent,
    CommentHomeComponent
  ],
  providers: [ArticleService]
})
export class ArticleModule { }
