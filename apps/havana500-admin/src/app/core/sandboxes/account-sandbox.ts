import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/store/reducers';
import * as accountActions from '../../core/store/actions/account.actions';
import { Observable } from 'rxjs';
import { APP_USER } from '../configs/configuration-const.config';
import { User, LoginModel, RegisterModel } from '@hav500workspace/shared';
import { OAuthWrapperService } from '../services/auth/oauth-wrapper.service';
/**
 * Abstraction Layer for communicating with Core Module
 *
 * @export
 * @class AccountSandbox
 */
@Injectable()
export class AccountSandbox {
  constructor(
    protected store$: Store<fromRoot.State>,
    protected oauthService: OAuthWrapperService
  ) {}

  public getLoggedUserObservable(): Observable<User> {
    return this.store$.select(fromRoot.getAccountLoggedUser);
  }

  public getUserProfile(): any {
    this.oauthService.loadUserProfile();
    return this.oauthService.userProfile;
  }

  public getUserClaims(): Observable<any> {
    return this.store$.select(fromRoot.getAccountUserClaims);
  }

  public getUserClaimsFromLocalStorage(): any {
    // this.oauthService.
    return localStorage.getItem(APP_USER);
  }

  public setUserClaimsState() {
    this.store$.dispatch(
      new accountActions.DoLoginSuccessAction(
        this.getUserClaimsFromLocalStorage()
      )
    );
  }

  public logout(): void {
    this.store$.dispatch(new accountActions.DoLogoutAction());
  }

  public login(form: LoginModel): void {
    this.store$.dispatch(new accountActions.DoLoginAction(form));
  }

  public register(form: RegisterModel): void {
    this.store$.dispatch(new accountActions.DoRegisterAction(form));
  }

  public refreshToken(): void {
    this.store$.dispatch(new accountActions.DoRefreshTokenAction(null));
  }

  /**
   * Loads the discovery document to configure most properties of this service.
   * The url of the discovery document is infered from the issuer's
   * url according to the OpenId Connect spec.
   * To use another url you can pass it to to optional parameter fullUrl.
   *
   * @param {string} [fullUrl]
   * @returns {Promise<Object>}
   * @memberof AccountSandbox
   */
  public loadDiscoveryDocument(fullUrl?: string): Promise<Object> {
    return this.oauthService.loadDiscoveryDocument();
  }
}
