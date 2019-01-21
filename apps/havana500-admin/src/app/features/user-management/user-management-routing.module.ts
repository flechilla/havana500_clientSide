import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { AuthenticatedGuard } from '../../core/route_guards/authenticated.guard';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
//import { ProjectsDashboardService } from '../../core/services/http/dashboard.service';

const userManagementRoutes: Routes = [
  {
    path: 'addNewUser',
    component: AddNewUserComponent,
    canActivate: [AuthenticatedGuard]
    // resolve: {
    //   data: ProjectsDashboardService
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(userManagementRoutes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
