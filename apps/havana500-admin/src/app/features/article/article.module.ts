import { ArticleHomeComponent } from './smart/article-home.component';
import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { CreateUpdateArticleComponent } from './dummy/create-update/create-update-article.component';
import { LabelsBarComponent } from './dummy/labels-bar/labels-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [ArticleRoutingModule, SharedModule, TranslateModule.forChild()],
  exports: [],
  declarations: [
    ArticleHomeComponent,
    CreateUpdateArticleComponent,
    LabelsBarComponent
  ],
  providers: [],
  entryComponents: [CreateUpdateArticleComponent]
})
export class ArticleModule {}
