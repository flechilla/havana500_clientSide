import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24),
];

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('passwordConfirmation').value && control.dirty)
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.passwordConfirmation.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true }     
 }

 export function validateSamePassWord(userForm: FormGroup) {
      if (this.userForm.controls.passwordConfirmation.value.length>0 &&
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
  
 }