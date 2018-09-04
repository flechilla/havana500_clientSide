import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountSandbox } from '../../../../core/sandboxes/account-sandbox';
import { antAnimations } from '../../../../shared/utils/animations';

@Component({
  selector: 'ant-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: antAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private accountSandbox: AccountSandbox
  ) {
    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    /** Loads the discovery document of the openIdConnect Server */
    this.accountSandbox.loadDiscoveryDocument();

    this.accountSandbox.logout();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  login() {
    this.accountSandbox.login(this.loginForm.value);
  }
}
