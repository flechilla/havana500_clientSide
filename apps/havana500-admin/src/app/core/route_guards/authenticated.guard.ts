import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import * as fromRoot from '../store/reducers';
import { Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import * as routerActions from '../store/actions/router.actions';

@Injectable({ providedIn: 'root' })
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
