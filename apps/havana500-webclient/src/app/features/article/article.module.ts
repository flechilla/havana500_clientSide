import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from 'libs/shared/src/lib/components/article/article.component';
import { ArticleService } from 'libs/shared/src/lib/services/http/article.service';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule
  ],
  declarations: [
    ArticleComponent
  ],
  providers: [ArticleService]
})
export class ArticleModule { }
