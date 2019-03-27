// import { authPasswordFlowConfig } from './../../core/configs/auth-password-flow.config';
// import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
// import { RegisterModel } from './../../core/models/register.model';
// import { LoginModel } from './../../core/models/login.model';
// import { User } from './../../core/models/user.model';
// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import * as fromRoot from '../../core/store/reducers';
// import * as accountActions from '../../core/store/actions/account.actions';
// import { OAuthWrapperService } from '../services/oauth-wrapper.service';
// import { Observable } from 'rxjs';
// import { APP_USER } from '../configs/configuration-const.config';
// /**
//  * Abstraction Layer for communicating with Core Module
//  *
//  * @export
//  * @class AccountSandbox
//  */
// @Injectable({ providedIn: 'root' })
// export class AccountSandbox {
//   constructor(
//     protected store$: Store<fromRoot.State>,
//     protected oauthService: OAuthWrapperService
//   ) {}

//   public getLoggedUserObservable(): Observable<User> {
//     return this.store$.select(fromRoot.getAccountLoggedUser);
//   }

//   public getUserProfile(): any {
//     return this.oauthService.loadUserProfile();
//   }

//   public getUserClaims(): Observable<any> {
//     return this.store$.select(fromRoot.getAccountUserClaims);
//   }

//   public getUserClaimsFromLocalStorage(): any {
//     // this.oauthService.
//     return localStorage.getItem(APP_USER);
//   }

//   public setUserClaimsState() {
//     this.store$.dispatch(
//       new accountActions.DoLoginSuccessAction(
//         this.getUserClaimsFromLocalStorage()
//       )
//     );
//   }

//   public logout(): void {
//     this.store$.dispatch(new accountActions.DoLogoutAction());
//   }

//   public login(form: LoginModel): void {
//     this.store$.dispatch(new accountActions.DoLoginAction(form));
//   }

//   public register(form: RegisterModel): void {
//     this.store$.dispatch(new accountActions.DoRegisterAction(form));
//   }

//   public refreshToken(): void {
//     this.store$.dispatch(new accountActions.DoRefreshTokenAction(null));
//   }

//   /**
//    * Loads the discovery document to configure most properties of this service.
//    * The url of the discovery document is infered from the issuer's
//    * url according to the OpenId Connect spec.
//    * To use another url you can pass it to to optional parameter fullUrl.
//    *
//    * @param {string} [fullUrl]
//    * @returns {Promise<Object>}
//    * @memberof AccountSandbox
//    */
//   public loadDiscoveryDocument(fullUrl?: string): Promise<Object> {
//     return this.oauthService.loadDiscoveryDocument();
//   }
// }
