import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseTableContainerComponent } from '../../../shared/components/base-table-container.component';
import { User } from '@hav500workspace/shared';
import { UserService } from '../../../core/services/user.service';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { MatDialog } from '@angular/material';
import { antAnimations } from '@hav500workspace/shared';


@Component({
  selector: 'admin-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  animations: [antAnimations]
})
export class ListUsersComponent extends BaseTableContainerComponent<User>
implements OnInit, AfterViewInit {
 
  protected dialogRef: any;

  constructor(userService: UserService,
    protected dialog: MatDialog) {
    super(['userName', 'firstName', 'lastName', 'email', 'phoneNumber', 'emailConfirmed'], userService);
   }

   ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  createNewUser() {
    this.dialogRef = this.dialog.open(AddNewUserComponent, {
      panelClass: 'add-new-user-dialog'
    });
  }

}
