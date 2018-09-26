import { RegisterModel } from './../../models/register.model';
import { LoginModel } from './../../models/login.model';
import { Action } from '@ngrx/store';

export const DO_LOGIN = '[Account] Do Login';
export const DO_LOGIN_SUCCESS = '[Account] Do Login Success';
export const DO_LOGIN_FAIL = '[Account] Do Login Fail';
export const DO_REGISTER = '[Account] Do Register';
export const DO_REGISTER_SUCCESS = '[Account] Do Register Success';
export const DO_REGISTER_FAIL = '[Account] Do Register Fail';
export const DO_LOGOUT = '[Account] Do Logout';
export const DO_LOGOUT_SUCCESS = '[Account] Do Logout Success';
export const DO_LOGOUT_FAIL = '[Account] Do Logout Fail';
export const ADD_USER = '[Account] Add user';
export const REMOVE_USER = '[Account] Remove user';
export const DO_REFRESH_TOKEN = '[Account] Do Refresh Token';
export const DO_REFRESH_TOKEN_SUCCESS = '[Account] Do Refresh Token Success';
export const DO_REFRESH_TOKEN_FAIL = '[Account] Do Refresh Token Fail';
/**
 * Login Actions
 */
export class DoLoginAction implements Action {
  public readonly type = DO_LOGIN;

  constructor(public payload: LoginModel) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DoLoginSuccessAction implements Action {
  public readonly type = DO_LOGIN_SUCCESS;

  constructor(public payload: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DoLoginFailAction implements Action {
  public readonly type = DO_LOGIN_FAIL;

  constructor(public payload: any = null) {}
}

/**
 * Register Actions
 */
// tslint:disable-next-line:max-classes-per-file
export class DoRegisterAction implements Action {
  public readonly type = DO_REGISTER;

  constructor(public payload: RegisterModel) {}
}
// tslint:disable-next-line:max-classes-per-file
export class DoRegisterSuccessAction implements Action {
  public readonly type = DO_REGISTER_SUCCESS;

  constructor(public payload: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DoRegisterFailAction implements Action {
  public readonly type = DO_REGISTER_FAIL;

  constructor(public payload: any = null) {}
}

/**
 * Logout Actions
 */
// tslint:disable-next-line:max-classes-per-file
export class DoLogoutAction implements Action {
  public readonly type = DO_LOGOUT;

  constructor(public payload: any = null) {}
}
// tslint:disable-next-line:max-classes-per-file
export class DoLogoutSuccessAction implements Action {
  public readonly type = DO_LOGOUT_SUCCESS;

  constructor(public payload: any = null) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DoLogoutFailAction implements Action {
  public readonly type = DO_LOGOUT_FAIL;

  constructor(public payload: any = null) {}
}

/** Refresh Token Actions */
export class DoRefreshTokenAction implements Action {
  public readonly type = DO_REFRESH_TOKEN;

  constructor(public payload: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DoRefreshTokenSuccessAction implements Action {
  public readonly type = DO_REFRESH_TOKEN_SUCCESS;

  constructor(public payload: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DoRefreshTokenFailAction implements Action {
  public readonly type = DO_REFRESH_TOKEN_FAIL;

  constructor(public payload: any = null) {}
}

/**
 * User Actions
 */
// tslint:disable-next-line:max-classes-per-file
export class AddUserAction implements Action {
  public readonly type = ADD_USER;

  constructor(public payload: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class RemoveUserAction implements Action {
  public readonly type = REMOVE_USER;

  constructor(public payload: any) {}
}

export type Actions =
  | DoLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | DoRegisterAction
  | DoRegisterSuccessAction
  | DoRegisterFailAction
  | DoLogoutAction
  | DoLogoutSuccessAction
  | DoLogoutFailAction
  | AddUserAction
  | RemoveUserAction
  | DoRefreshTokenAction
  | DoRefreshTokenSuccessAction
  | DoRefreshTokenFailAction;
