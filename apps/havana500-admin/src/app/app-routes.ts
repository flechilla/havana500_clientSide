import { Routes } from '@angular/router';
export const appRoutes: Routes = [
  {
    path: 'account',
    loadChildren: './features/account/account.module#AccountModule'
  },
  {
    path: 'dashboard',
    loadChildren: './features/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'articles',
    loadChildren: './features/article/article.module#ArticleModule'
  },
  {
    path: 'comments',
    loadChildren: './features/comment/comment.module#CommentModule'
  },
  { path: '**', redirectTo: 'dashboard' }
];
