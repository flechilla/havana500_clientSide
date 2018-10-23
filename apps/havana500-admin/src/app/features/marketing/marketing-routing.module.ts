import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '../../core/route_guards/authenticated.guard';
import { MarketingHomeComponent } from './smart/marketing-home.component';

const routes: Routes = [
  {
    path: '',
    component: MarketingHomeComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class MarketingRoutingModule {}
