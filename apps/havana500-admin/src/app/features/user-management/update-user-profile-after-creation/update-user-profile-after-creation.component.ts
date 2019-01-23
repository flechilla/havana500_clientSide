import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { MatDialog } from '@angular/material';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { User } from '@hav500workspace/shared';

@Component({
  selector: 'admin-update-user-profile-after-creation',
  templateUrl: './update-user-profile-after-creation.component.html',
  styleUrls: ['./update-user-profile-after-creation.component.scss']
})
export class UpdateUserProfileAfterCreationComponent implements OnInit {
  private userId: string;
  private code: string;
  private userHasValidCode: boolean;
  protected dialogRef: any;
  private user: User;

  constructor(private route: ActivatedRoute,
    private userService: UserService
    ,protected dialog: MatDialog) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.code = this.route.snapshot.queryParamMap.get('code');
    this.checkUserCode();
  
  }

  checkUserCode(): void {
    console.log('userid: ' + this.userId);
    console.log('code: ' + this.code);
    this.userService
      .checkUserCode(this.userId, this.code)
      .subscribe(r => {
        this.userHasValidCode = r.result;
        this.user = r.user;
        if (this.userHasValidCode) {
          this.updateUserData();
        }
        console.log('CheckEmailCode result: ' + r);
      });

  }

  updateUserData() {
    this.dialogRef = this.dialog.open(AddNewUserComponent, {
      panelClass: 'add-new-user-dialog',
      data: {
        user: this.user,
        userId: this.user.id
      }
    });
  }
}
