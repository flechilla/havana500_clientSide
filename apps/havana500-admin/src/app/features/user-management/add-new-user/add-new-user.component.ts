import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl
} from '@angular/forms';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatMenuTrigger
} from '@angular/material';
import { Observable } from 'rxjs';
import { antAnimations, User } from '@hav500workspace/shared';
import { startWith, map } from 'rxjs/operators';
import { UploadService } from '../../../core/services/http/upload.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'admin-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  public userForm: FormGroup;
  public userId: string;
  private user: User;
  constructor(
    protected fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User;
      userId: string;
    },
    private uploadService: UploadService,
    private userService: UserService
  ) {
    this.user = data.user;
    this.userId = data.userId;

  }

  ngOnInit() {
    this.loadForm();
  }

  protected loadForm() {
    this.userForm = this.fb.group({
      id: this.userId? this.userId: '',
      userName: this.user? this.user.userName: '',
      firstName: this.user? this.user.firstName: '',
      lastName: this.user? this.user.lastName: '',
      email: this.user? this.user.email: '',
      role: this.user? this.user.role: '',
      userImageHref: ''
    });
  }

  save() {
    console.log(this.userForm.value);
    const user = this.userForm.value as User;
    this.userService
    .create(user)
    .subscribe();
  }

  close() {

  }
}
