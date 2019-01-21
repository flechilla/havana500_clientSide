import { NgModule } from '@angular/core';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { SharedModule } from '@hav500workspace/shared';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';

@NgModule({
  declarations: [AddNewUserComponent, ListUsersComponent],
  imports: [
    SharedModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
