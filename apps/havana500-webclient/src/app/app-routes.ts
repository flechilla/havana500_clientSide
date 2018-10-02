import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from 'libs/shared/src/lib/components/article/article.component';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
  {
    path: 'articles/:id',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export default class AppRoutingModule {}
