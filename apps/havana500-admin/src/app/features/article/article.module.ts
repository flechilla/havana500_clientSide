import { ArticleHomeComponent } from './smart/article-home.component';
import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '@hav500workspace/shared';

@NgModule({
  imports: [ArticleRoutingModule, SharedModule],
  exports: [],
  declarations: [ArticleHomeComponent],
  providers: []
})
export class ArticleModule {}
