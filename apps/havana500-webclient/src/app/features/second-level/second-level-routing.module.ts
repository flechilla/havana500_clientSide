import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondLevelDefaultComponent } from './second-level-default/second-level-default.component';

const routes: Routes = [{ path: '', component: SecondLevelDefaultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: []
})
export class SecondLevelRoutingModule {}
