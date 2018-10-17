import { Routes, RouterModule } from '@angular/router';
import { SecondLevelDefaultComponent } from './features/second-level/second-level-default/second-level-default.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'section/:sectionName',
    component: SecondLevelDefaultComponent
  },
  { path: '**', redirectTo: 'home' }
];
