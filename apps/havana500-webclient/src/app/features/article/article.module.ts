import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { CommentHomeComponent } from '../comment-home/comment-home/comment-home.component';
import { CommentComponent } from '../comment-home/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { CommentHomeModule } from '../comment-home/comment-home.module';
import { ArticleComponent } from './article/article.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    CommentHomeModule
  ],
  declarations: [ArticleComponent],
  providers: []
})
export class ArticleModule {}
