import { Routes, RouterModule } from '@angular/router';
import { SecondLevelDefaultComponent } from './features/second-level/second-level-default/second-level-default.component';

export const appRoutes: Routes = [
  { path: 'home', loadChildren: './features/home/home.module#HomeModule' },
  {
    path: 'section/:sectionName',
    loadChildren:
      './features/second-level/second-level.module#SecondLevelModule'
  },
  {
    path: 'article/:id',
    loadChildren: './features/article/article.module#ArticleModule'
  },
  { path: '**', redirectTo: 'home' }
];
