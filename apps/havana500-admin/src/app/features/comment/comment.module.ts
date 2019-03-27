import { CommentHomeComponent } from './smart/comment-selector/comment-home.component';
import { NgModule } from '@angular/core';
import { CommentRoutingModule } from './comment-routing.module';
import { SharedModule } from '@hav500workspace/shared';

import { CommentsAnalyzerComponent } from './smart/comments-analyzer/comments-analyzer.component';
import { CommentModerateCardComponent } from './dummy/comment-moderate-card/comment-moderate-card.component';

@NgModule({
  imports: [CommentRoutingModule, SharedModule],
  exports: [],
  declarations: [
    CommentHomeComponent,
    CommentsAnalyzerComponent,
    CommentModerateCardComponent
  ],
  providers: [],
  entryComponents: [CommentsAnalyzerComponent]
})
export class CommentModule {}
