import { NgModule } from '@angular/core';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { SharedModule } from '@hav500workspace/shared';
import { UserManagementRoutingModule } from './user-management-routing.module';

@NgModule({
  declarations: [AddNewUserComponent],
  imports: [
    SharedModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
