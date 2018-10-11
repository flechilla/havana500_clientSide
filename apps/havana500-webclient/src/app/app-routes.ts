import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SecondLevelDeafultComponent } from './features/second-level/second-level-deafult/second-level-deafult.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'section/:sectionName',
    component: SecondLevelDeafultComponent
  },
  { path: '**', redirectTo: 'home' }
];
