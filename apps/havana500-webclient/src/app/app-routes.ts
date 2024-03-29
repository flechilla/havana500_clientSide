import { Routes, RouterModule } from '@angular/router';
import { SecondLevelDefaultComponent } from './features/second-level/second-level-default/second-level-default.component';
import { GalleryComponent } from './features/gallery/gallery.component';

export const appRoutes: Routes = [
  { path: 'home', loadChildren: './features/home/home.module#HomeModule' },
  {
    path: 'section/galeria',
    component: GalleryComponent,
    pathMatch: 'full'
  },
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
