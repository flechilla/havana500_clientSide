import { CommentHomeComponent } from './smart/comment-home.component';
import { NgModule } from '@angular/core';
import { CommentRoutingModule } from './comment-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { ArticleCommentsInfoService } from '../../core/services/http/article-comments-info.service';

@NgModule({
  imports: [CommentRoutingModule, SharedModule],
  exports: [],
  declarations: [CommentHomeComponent],
  providers: []
})
export class CommentModule {}
