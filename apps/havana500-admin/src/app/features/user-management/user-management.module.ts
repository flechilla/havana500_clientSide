import { NgModule } from '@angular/core';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { SharedModule } from '@hav500workspace/shared';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from '../../core/services/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [AddNewUserComponent, ListUsersComponent, UserProfileComponent],
  imports: [
    SharedModule,
    UserManagementRoutingModule
  ],
  providers: [
    UserService
  ]
})
export class UserManagementModule { }
