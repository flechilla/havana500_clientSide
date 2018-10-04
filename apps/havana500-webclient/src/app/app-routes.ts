import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from '@hav500workspace/shared';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export default class AppRoutingModule {}
 