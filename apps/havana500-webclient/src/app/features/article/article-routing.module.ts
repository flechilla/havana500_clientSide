import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from 'libs/shared/src/lib/components/article/article.component';

const articlesRoutes: Routes = [
    { path: 'article/:id',  component: ArticleComponent }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(articlesRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class ArticleRoutingModule { }