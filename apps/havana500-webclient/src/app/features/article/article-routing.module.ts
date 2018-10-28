import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from '@hav500workspace/shared';

const articlesRoutes: Routes = [{ path: '', component: ArticleComponent }];

@NgModule({
  imports: [RouterModule.forChild(articlesRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}
