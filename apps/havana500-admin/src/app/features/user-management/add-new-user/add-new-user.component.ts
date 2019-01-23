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
import { antAnimations, User, Picture, LoginModel } from '@hav500workspace/shared';
import { startWith, map } from 'rxjs/operators';
import { UploadService } from '../../../core/services/http/upload.service';
import { UserService } from '../../../core/services/user.service';
import {
  EmailValidation,
  PasswordValidation,
  RepeatPasswordValidator
} from './formValidator';
import { UserUpdateModel } from '../../../core/models/userUpdateModel';
import { AccountSandbox } from '../../../core/sandboxes/account-sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  public userForm: FormGroup;
  public userId: string;
  private user: User;
  private userImageForm: FormGroup;
  @ViewChild('userImage')
  userImage;
  constructor(
    protected fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User;
      userId: string;
    },
    private uploadService: UploadService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = data.user;
    this.userId = data.userId;
    if (this.user) {
      this.dialogRef.disableClose = true;
    }
  }

  ngOnInit() {
    this.loadForm();
  }

  protected loadForm() {
    this.userForm = this.fb.group(
      {
        id: this.userId ? this.userId : '',
        firstName: this.user ? this.user.firstName : '',
        lastName: this.user ? this.user.lastName : '',
        phoneNumber: this.user ? this.user.phoneNumber : '',
        email: new FormControl(
          this.user ? this.user.email : '',
          EmailValidation
        ),
        role: this.user ? this.user.role : '',
        userImageHref: '',
        password: new FormControl('', PasswordValidation),
        passwordConfirmation: ''
      },
      { validator: RepeatPasswordValidator }
    );

    this.userForm.controls.passwordConfirmation.valueChanges.subscribe(() => {
      if (
        this.userForm.controls.passwordConfirmation.value !==
        this.userForm.controls.password.value
      ) {
        this.userForm.controls.passwordConfirmation.setErrors({
          notSamePassword: true
        });
      } else {
        this.userForm.controls.passwordConfirmation.setErrors({
          notSamePassword: null
        });
        this.userForm.controls.passwordConfirmation.updateValueAndValidity();
        this.userForm.updateValueAndValidity();
      }
    });

    this.userImageForm = this.fb.group({
      userImage: ''
    });
  }

  save() {
    if (this.userId && this.userId !== '') {
      this.updateUserData();
      return;
    }
    this.dialogRef.close();
    const user = this.userForm.value as User;
    this.userService.create(user).subscribe();
  }

  close() {}

  updateUserData() {
    console.log(this.userForm.value);
    const user = this.userForm.value as UserUpdateModel;

    this.userService.update(user.id, user).subscribe((r) => {
      const loginModel = new LoginModel(r.email, user.password);
      this.router.navigate(['/login']);
    });
  }

  editUserImage(userId: string) {
    console.log('Before changing the user image');
    const fi = this.userImage.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.uploadService
        .uploadUserImage(fileToUpload, this.userId)
        .subscribe((res: Picture) => {
          //this.previewMainPicture(res);
          console.log(res);
        });
    }
  }

  loadNewImage() {
    this.userImage.nativeElement.click();
  }
}
