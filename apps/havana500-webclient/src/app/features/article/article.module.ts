import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArticleComponent } from '@hav500workspace/shared';
import { ArticleService } from '@hav500workspace/shared';

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
