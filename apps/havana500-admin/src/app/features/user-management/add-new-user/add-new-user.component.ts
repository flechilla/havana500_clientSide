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
  constructor(
    protected fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user$: Observable<User>;
      userId: string;
    },
    private uploadService: UploadService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadForm();
  }

  protected loadForm() {
    this.userForm = this.fb.group({
      id: '',
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
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
