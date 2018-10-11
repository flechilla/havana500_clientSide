import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentHomeComponent } from './smart/comment-selector/comment-home.component';
import { AuthenticatedGuard } from '../../core/route_guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: CommentHomeComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule {}
