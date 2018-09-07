import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleHomeComponent } from './smart/article-home.component';
import { AuthenticatedGuard } from '../../core/route_guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: ArticleHomeComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}
