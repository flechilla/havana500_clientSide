import { Routes } from '@angular/router';
export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  { path: '**', redirectTo: 'home' }
];
