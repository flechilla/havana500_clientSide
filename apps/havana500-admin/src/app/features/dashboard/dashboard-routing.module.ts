import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { AuthenticatedGuard } from '../../core/route_guards/authenticated.guard';
import { AntDashboardComponent } from './smart/dashboard.component';
//import { ProjectsDashboardService } from '../../core/services/http/dashboard.service';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: AntDashboardComponent,
    canActivate: [AuthenticatedGuard]
    // resolve: {
    //   data: ProjectsDashboardService
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
