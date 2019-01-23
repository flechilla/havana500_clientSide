import { NgModule } from '@angular/core';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { SharedModule } from '@hav500workspace/shared';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from '../../core/services/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateUserProfileAfterCreationComponent } from './update-user-profile-after-creation/update-user-profile-after-creation.component';

@NgModule({
  declarations: [AddNewUserComponent, ListUsersComponent, UserProfileComponent, UpdateUserProfileAfterCreationComponent],
  imports: [
    SharedModule
  ],
  providers: [
    UserService
  ]
})
export class UserManagementModule { }
