import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArticleComponent } from 'libs/shared/src/lib/components/article/article.component';
import { ArticleService } from 'libs/shared/src/lib/services/http/article.service';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    ArticleComponent
  ],
  providers: [ArticleService]
})
export class ArticleModule { }
