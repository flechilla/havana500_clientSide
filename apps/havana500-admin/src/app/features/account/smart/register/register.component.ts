import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AccountSandbox } from '../../../../core/sandboxes/account-sandbox';
import { OAuthService } from 'angular-oauth2-oidc';
import { antAnimations } from '@hav500workspace/shared';

@Component({
  selector: 'admin-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: antAnimations
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private accountSandbox: AccountSandbox,
    private oauthService: OAuthService
  ) {
    this.registerFormErrors = {
      userName: {},
      email: {},
      password: {},
      confirmPassword: {}
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, confirmPassword]]
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });
  }

  onRegisterFormValuesChanged() {
    for (const field in this.registerFormErrors) {
      if (!this.registerFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.registerFormErrors[field] = control.errors;
      }
    }
  }

  doRegister() {
    const toRegister = this.registerForm.value;
    console.log(toRegister);
  }
}

function confirmPassword(control: AbstractControl) {
  if (!control.parent || !control) {
    return;
  }

  const password = control.parent.get('password');
  const confirmPassword = control.parent.get('confirmPassword');

  if (!password || !confirmPassword) {
    return;
  }

  if (confirmPassword.value === '') {
    return;
  }

  if (password.value !== confirmPassword.value) {
    return {
      passwordsNotMatch: true
    };
  }
}
