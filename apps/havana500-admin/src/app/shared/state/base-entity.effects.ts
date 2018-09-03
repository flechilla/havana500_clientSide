import { Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as crudActions from '../../shared/state/base-crud.actions';
import { BaseEntity } from '../models/base-entity.model';
import { BaseCrudService } from '../services/base-crud.service';
import { BaseCrudActionTypeNameFactory } from './base-crud-typename-factory';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';

export abstract class BaseEntityEffects<T extends BaseEntity<any>> {
  constructor(
    protected type: new () => T,
    protected actions$: Actions,
    protected baseService: BaseCrudService<T>
  ) {}

  public getEntityById$(): Observable<Action> {
    const types: BaseCrudActionTypeNameFactory = new BaseCrudActionTypeNameFactory(
      this.type
    );
    return this.actions$.pipe(
      ofType(types.GetById),
      map((action: crudActions.GetByIdAction<T>) => {
        return action.payload;
      }),
      mergeMap(payload => {
        if (payload) {
          return this.baseService.get(payload.id, payload.query).pipe(
            map(resp => {
              return new crudActions.GetByIdSuccessAction<T>(this.type, resp);
            }),
            catchError(err => {
              return of(new crudActions.GetByIdFailedAction<T>(this.type));
            })
          );
        }
      })
    );
  }

  public createEntity$(): Observable<Action> {
    const types: BaseCrudActionTypeNameFactory = new BaseCrudActionTypeNameFactory(
      this.type
    );
    return this.actions$.pipe(
      ofType(types.Create),
      map((action: crudActions.CreateAction<T>) => action.payload),
      mergeMap(payload => {
        return this.baseService.create(payload.entityToCreate).pipe(
          mergeMap((entityCreated: T) => [
            new crudActions.CreateSuccessAction<T>(this.type, {
              oldId: payload.entityToCreate.Id,
              createdEntity: entityCreated
            })
          ]),
          catchError(err => {
            console.log('errorrr!!!');
            return of(
              new crudActions.CreateFailAction(
                this.type,
                payload.entityToCreate.Id
              )
            );
          })
        );
      })
    );
  }

  public updateEntity$(): Observable<Action> {
    const types: BaseCrudActionTypeNameFactory = new BaseCrudActionTypeNameFactory(
      this.type
    );
    return this.actions$.pipe(
      ofType(types.Update),
      map((action: crudActions.UpdateAction<T>) => action.payload),
      concatMap(payload => {
        return this.baseService
          .update(payload.newEntity.Id, payload.newEntity)
          .pipe(
            map(
              updatedEntity =>
                new crudActions.UpdateSuccessAction(this.type, updatedEntity)
            ),
            catchError(err =>
              of(
                new crudActions.UpdateFailedAction(this.type, payload.oldEntity)
              )
            )
          );
      })
    );
  }

  public deleteEntity$(): Observable<Action> {
    const types: BaseCrudActionTypeNameFactory = new BaseCrudActionTypeNameFactory(
      this.type
    );
    return this.actions$.pipe(
      ofType(types.Delete),
      map((action: crudActions.DeleteAction<T>) => action.payload),
      mergeMap(payload => {
        return this.baseService.delete(payload.entityToDelete.Id).pipe(
          mergeMap(() => [new crudActions.DeleteSuccessAction(this.type)]),
          catchError(err => {
            return of(
              new crudActions.DeleteFailedAction(
                this.type,
                payload.entityToDelete
              )
            );
          })
        );
      })
    );
  }
}
