import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as actions from '../actions/router.actions';
import { tap, map } from 'rxjs/operators';
import { RouteModel } from '@hav500workspace/shared';

@Injectable({ providedIn: 'root' })
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public navigate$ = this.actions$.ofType(actions.GO).pipe(
    map((action: actions.GoAction) => action.payload),
    tap((route: RouteModel) => {
      return (
        this.router
          // tslint:disable-next-line:max-line-length
          .navigate(route.path, { ...route.query, ...route.extras })
          .catch(x => this.router.navigate(['error']))
      );
    })
  );
}
