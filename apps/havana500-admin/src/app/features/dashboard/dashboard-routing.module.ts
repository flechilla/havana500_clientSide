import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { AuthenticatedGuard } from '../../core/route_guards/authenticated.guard';
import { AntDashboardComponent } from './smart/dashboard.component';
import { ProjectsDashboardService } from '@hav500workspace/shared';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: AntDashboardComponent,
    canActivate: [AuthenticatedGuard],
    resolve: {
      data: ProjectsDashboardService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
