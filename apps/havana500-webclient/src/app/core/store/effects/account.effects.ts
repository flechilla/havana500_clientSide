import { OAuthService } from 'angular-oauth2-oidc';
import * as actions from '../actions/account.actions';
import * as routerActions from '../actions/router.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  map,
  exhaustMap,
  mergeMap,
  catchError,
  concatMap
} from 'rxjs/operators';
import { APP_USER } from '../../configs/configuration-const.config';

import { Observable, from, of } from 'rxjs';
import { LoginModel } from '@hav500workspace/shared';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable({ providedIn: 'root' })
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountService: AuthService,
    private oauthService: OAuthService
  ) {}

  /**
   * Login effect
   */
  // tslint:disable-next-line:member-ordering
  // @Effect()
  // public doLogin$: Observable<Action> = this.actions$
  //   .ofType(actions.DO_LOGIN)
  //   .map((action: actions.DoLoginAction) => action.payload)
  //   .switchMap(state => {
  //     return (
  //       this.accountService
  //         .login(state)
  //         // tslint:disable-next-line:max-line-length
  //         .flatMap(logged => {
  //           if (logged) {
  //             return [
  //               new actions.DoLoginSuccessAction(
  //                 JSON.parse(localStorage[APP_USER])
  //               ) as Action,
  //               new routerActions.GoAction({ path: ["app", "companies"] })
  //             ];
  //           } else {
  //             return [new actions.DoLoginFailAction() as Action];
  //           }
  //         })
  //         .catch(error => of(new actions.DoLoginFailAction()))
  //     );
  //   });

  /**
   * OAuth Login effect
   */
  // tslint:disable-next-line:member-ordering
  @Effect()
  public doLoginOAuth$: Observable<Action> = this.actions$
    .ofType(actions.DO_LOGIN)
    .pipe(
      map((action: actions.DoLoginAction) => action.payload),
      exhaustMap((state: LoginModel) => {
        return from(
          this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(
            state.email,
            state.password
          )
        ).pipe(
          mergeMap(() => {
            // User Claims
            const userClaims = this.oauthService.getIdentityClaims();
            console.log(userClaims);
            console.log('Access Token: ' + this.oauthService.getAccessToken);
            console.log(
              'Expiration Token: ' + this.oauthService.getAccessTokenExpiration
            );

            // Stores the User in Storage
            localStorage.setItem(APP_USER, JSON.stringify(userClaims));
            return [
              new actions.DoLoginSuccessAction(userClaims) as Action,
              new routerActions.GoAction({ path: ['company'] })
            ];
          }),
          catchError(error => of(new actions.DoLoginFailAction()))
        );
      })
    );

  @Effect()
  public doRefreshToken$: Observable<Action> = this.actions$
    .ofType(actions.DO_REFRESH_TOKEN)
    .pipe(
      map((action: actions.DoRefreshTokenAction) => action.payload),
      exhaustMap(state => {
        return from(this.oauthService.refreshToken()).pipe(
          map(() => new actions.DoRefreshTokenSuccessAction(null) as Action),
          catchError(error => of(new actions.DoRefreshTokenFailAction()))
        );
      })
    );

  /**
   * Registers effect
   */
  // tslint:disable-next-line:member-ordering
  @Effect()
  public doRegister$: Observable<Action> = this.actions$
    .ofType(actions.DO_REGISTER)
    .pipe(
      map((action: actions.DoRegisterAction) => action.payload),
      exhaustMap(state => {
        return this.accountService.register(state).pipe(
          mergeMap(registered => {
            if (registered) {
              return [
                new actions.DoRegisterSuccessAction(
                  JSON.parse(localStorage[APP_USER])
                ) as Action,
                new routerActions.GoAction({ path: ['company'] })
              ];
            } else {
              return [new actions.DoRegisterFailAction() as Action];
            }
          }),
          catchError(error => of(new actions.DoRegisterFailAction()))
        );
      })
    );

  /**
   * Logout effect
   */
  // tslint:disable-next-line:member-ordering
  @Effect()
  public doLogout$: Observable<Action> = this.actions$
    .ofType(actions.DO_LOGOUT)
    .pipe(
      exhaustMap((action: actions.DoLogoutAction) => {
        this.accountService.logout();
        this.oauthService.logOut(false);
        return [
          new actions.DoLogoutSuccessAction(),
          new routerActions.GoAction({
            path: ['account', 'login']
          })
        ];
      })
    );
}
