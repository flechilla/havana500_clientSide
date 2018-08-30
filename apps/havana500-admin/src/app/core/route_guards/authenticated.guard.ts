import { AuthService } from './../http/auth.service';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import * as fromRoot from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as routerActions from '../../store/actions/router.actions';
import { of } from 'rxjs/observable/of';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private store$: Store<fromRoot.State>,
    protected oauthService: OAuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const isAuthenticated = this.oauthService.hasValidAccessToken();

    if (!isAuthenticated) {
      this.store$.dispatch(
        new routerActions.GoAction({
          path: ['account', 'login']
        })
      );
    }

    return of(isAuthenticated);
  }
}
