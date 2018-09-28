import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, ReplaySubject, of } from 'rxjs';
import { BaseEntityEffects } from './base-entity.effects';
import { Action } from '@ngrx/store';
import * as crudActions from './base-crud.actions';
import { BaseEntity } from '../models';
import { BaseCrudService } from '../services';

class TestBaseModel extends BaseEntity<number> {
  name: string;
}

@Injectable()
class TestBaseEffects extends BaseEntityEffects<TestBaseModel> {
  constructor(actions$: Actions, service: BaseModelService) {
    super(TestBaseModel, actions$, service);
  }

  @Effect()
  public getBaseModelById$: Observable<Action> = this.getEntityById$();

  @Effect()
  public createBaseModel$: Observable<Action> = this.createEntity$();

  @Effect()
  public deleteBaseModel$: Observable<Action> = this.deleteEntity$();

  @Effect()
  public updateBaseModel$: Observable<Action> = this.updateEntity$();

  //#endregion
}

@Injectable()
class BaseModelService extends BaseCrudService<TestBaseModel> {
  constructor() {
    super('', null);
  }
}

describe('Base Effects', () => {
  let effects: TestBaseEffects;
  let actions$: any;
  let service;

  beforeEach(() => {
    service = jasmine.createSpyObj('BaseModelService', [
      'get',
      'getAll',
      'create',
      'update',
      'delete'
    ]);

    actions$ = new ReplaySubject(1);

    effects = new TestBaseEffects(actions$, service);
  });

  //#region GetModelByIDSuccess
  it('get model by id ok', () => {
    const action = new crudActions.GetByIdAction(TestBaseModel, {
      id: 0,
      query: ''
    });
    const completion = new crudActions.GetByIdSuccessAction(TestBaseModel, {
      id: 5,
      name: 's'
    });

    service.get.and.returnValue(
      of({
        id: 5,
        name: 's'
      })
    );

    actions$.next(action);

    effects.getBaseModelById$.subscribe(result => {
      expect(result).toEqual(completion);
    });
  });
  //#endregion

  //#region GetModelByIDFail
  it('get model by id fail', () => {
    const action = new crudActions.GetByIdAction(TestBaseModel, {
      id: 0,
      query: ''
    });
    const completion = new crudActions.GetByIdFailedAction(TestBaseModel);

    service.get.and.returnValue(Observable.throw(null));

    actions$.next(action);

    effects.getBaseModelById$.subscribe(result => {
      expect(result).toEqual(completion);
    });
  });
  //#endregion

  //#region CreateModelOK
  it('create model ok', () => {
    const entity: TestBaseModel = {
      name: 'new Entity',
      id: 123
    };
    const action = new crudActions.CreateAction(TestBaseModel, {
      entityToCreate: {
        name: 'new Entity',
        id: 456
      }
    });
    const completion = [
      new crudActions.CreateSuccessAction(TestBaseModel, {
        oldId: 456,
        createdEntity: entity
      })
    ];

    service.create.and.returnValue(of(entity));
    actions$.next(action);
    // todo count actions
    effects.createBaseModel$.subscribe(result => {
      console.log(result);
      expect(completion).toContain(result as any);
    });
  });
  //#endregion

  //#region CreateModel Fail
  it('create model fail', () => {
    const entity: TestBaseModel = {
      name: 'new Entity',
      id: 123
    };
    const action = new crudActions.CreateAction(TestBaseModel, {
      entityToCreate: {
        name: 'new Entity',
        id: 456
      }
    });
    const completion = [new crudActions.CreateFailAction(TestBaseModel, '456')];

    service.create.and.returnValue(Observable.throw(null));
    actions$.next(action);
    // todo count actions
    effects.createBaseModel$.subscribe(result => {
      console.log(result);
      expect(completion).toContain(result as any);
    });
    // console.log('COOOOUUUNT');
    // actions$.next(action);

    // effects.createBaseModel$.pipe(count()).subscribe(count=> { console.log('------>'); console.log(count); expect(count).toBe(2);});
  });
  //#endregion

  //#region DeleteModel OK
  it('delete model ok', () => {
    const entity: TestBaseModel = {
      name: 'new Entity',

      id: 123
    };
    const action = new crudActions.DeleteAction(TestBaseModel, {
      entityToDelete: entity,
      ownerId: '0',
      ownerType: TestBaseModel
    });
    const completion = [new crudActions.DeleteSuccessAction(TestBaseModel)];

    service.delete.and.returnValue(of('ok'));
    actions$.next(action);
    // todo count actions
    effects.deleteBaseModel$.subscribe(result => {
      expect(completion).toContain(result as any);
    });
  });
  //#endregion

  //#region DeleteModel Fail
  it('delete model fail', () => {
    const entity: TestBaseModel = {
      name: 'new Entity',

      id: 123
    };
    const action = new crudActions.DeleteAction(TestBaseModel, {
      entityToDelete: entity,
      ownerId: '0',
      ownerType: TestBaseModel
    });
    const completion = [
      new crudActions.DeleteFailedAction(TestBaseModel, entity)
    ];

    service.delete.and.returnValue(Observable.throw(null));
    actions$.next(action);
    // todo count actions
    effects.deleteBaseModel$.subscribe(result => {
      expect(completion).toContain(result as any);
    });
  });
  //#endregion

  //#region UpdateModel OK
  it('update model fail', () => {
    const oldEntity: TestBaseModel = {
      name: 'new Entity',

      id: 123
    };
    const newEntity: TestBaseModel = {
      name: 'new Entitu',
      id: 123
    };
    const action = new crudActions.UpdateAction(TestBaseModel, {
      oldEntity: oldEntity,
      newEntity: newEntity
    });
    const completion = new crudActions.UpdateSuccessAction(
      TestBaseModel,
      newEntity
    );

    service.update.and.returnValue(of(newEntity));
    actions$.next(action);
    // todo count actions
    effects.updateBaseModel$.subscribe(result => {
      expect(completion as Action).toEqual(result as Action);
    });
  });
  //#endregion

  //#region UpdateModel Fail

  it('update model fail', () => {
    const oldEntity: TestBaseModel = {
      name: 'new Entity',
      id: 123
    };
    const newEntity: TestBaseModel = {
      name: 'new Entitu',
      id: 123
    };
    const action = new crudActions.UpdateAction(TestBaseModel, {
      oldEntity: oldEntity,
      newEntity: newEntity
    });
    const completion = new crudActions.UpdateFailedAction(
      TestBaseModel,
      oldEntity
    );

    service.update.and.returnValue(Observable.throw(null));
    actions$.next(action);
    // todo count actions
    effects.updateBaseModel$.subscribe(result => {
      expect(completion as Action).toEqual(result as Action);
    });
  });
  //#endregion
});
