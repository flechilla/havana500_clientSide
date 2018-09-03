import { Action } from '@ngrx/store';
import { BaseCrudActionTypeNameFactory } from './base-crud-typename-factory';

//#region BaseCRUD

export class GetAllAction<T> implements Action {
  public readonly type: string;
  public readonly payload: any = null;
  constructor(type: new () => T) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetAll;
  }
}

export class GetAllSuccessAction<T> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of GetAllSuccessAction.
   * @param {new () => T} type
   * @param {T[]} payload The fetched elements
   * @memberof GetAllSuccessAction
   */
  constructor(type: new () => T, public payload: T[]) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetAllSuccess;
  }
}

export class GetAllFailedAction<T> implements Action {
  public readonly type: string;
  public readonly payload: any = null;

  constructor(type: new () => T) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetAllFailed;
  }
}

export class CreateAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of CreateAction.
   * @param {new () => T} type
   * @param {{ entityToCreate: T; }} payload Contains the entity to create
   * @memberof CreateAction
   */
  constructor(
    type: new () => T,
    public payload: {
      entityToCreate: T;
    }
  ) {
    this.type = new BaseCrudActionTypeNameFactory(type).Create;
  }
}

export class CreateSuccessAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of CreateSuccessAction.
   * @param {new () => T} type
   * @param {{ oldId: any; createdEntity: T }} payload Contains the preassign id of the entity
   *  to be created (optimistic creation) and the entity created.
   * @memberof CreateSuccessAction
   */
  constructor(
    type: new () => T,
    public payload: { oldId: any; createdEntity: T }
  ) {
    this.type = new BaseCrudActionTypeNameFactory(type).CreateSuccess;
  }
}

export class CreateFailAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of CreateFailedAction.
   * @param {new () => T} type
   * @param {*} payload preassign id (optimistic approach) of the entity that was intended to be created.
   * @memberof CreateFailedAction
   */
  constructor(type: new () => T, public payload: any) {
    this.type = new BaseCrudActionTypeNameFactory(type).CreateFailed;
  }
}

export class GetByIdAction<T> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of GetByIdAction.
   * @param {new () => T} type
   * @param {{id:any, query:string}} payload Id of the entity to look up and
   *  the query of the required properties.
   * @memberof GetByIdAction
   */
  constructor(type: new () => T, public payload: { id: any; query: string }) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetById;
  }
}

export class GetByIdSuccessAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of GetByIdSuccessAction.
   * @param {new () => T} type
   * @param {T} payload The fetched entity instance from server containing the requested properties.
   * @memberof GetByIdSuccessAction
   */
  constructor(type: new () => T, public payload: T) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetByIdSuccess;
  }
}

export class GetByIdFailedAction<T> implements Action {
  public readonly type: string;
  public readonly payload: any = null;

  /**
   * Creates an instance of GetByIdFailedAction.
   * @param {new () => T} type
   * @memberof GetByIdFailedAction
   */
  constructor(type: new () => T) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetById;
  }
}

export class UpdateAction<T> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of UpdateAction.
   * @param {new () => T} type
   * @param {{oldEntity: T; newEntity:T}} payload Contains the Entity to be updated with
   *  new values and the original entity.
   * @memberof UpdateAction
   */
  constructor(
    type: new () => T,
    public payload: { oldEntity: T; newEntity: T }
  ) {
    this.type = new BaseCrudActionTypeNameFactory(type).Update;
  }
}

export class UpdateSuccessAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of UpdateSuccessAction.
   * @param {new () => T} type
   * @param {T} payload The updated entity
   * @memberof UpdateSuccessAction
   */
  constructor(type: new () => T, public readonly payload: T) {
    this.type = new BaseCrudActionTypeNameFactory(type).UpdateSuccess;
  }
}

export class UpdateFailedAction<T> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of UpdateFailedAction.
   * @param {new () => T} type
   * @param {T} payload Entity which updating failed containing original values (For optimistic approach)
   * @memberof UpdateFailedAction
   */
  constructor(type: new () => T, public payload: T) {
    this.type = new BaseCrudActionTypeNameFactory(type).UpdateFailed;
  }
}

export class DeleteAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of DeleteAction.
   * @param {new () => T} type
   * @param {{
   *       entityToDelete: T;
   *       ownerId: any;
   *       ownerType: new () => any;
   *     }} payload Contains the entity to delete, the id of the owner entity which ordered its deletion
   * (strong dependent) and the type of the owner entity that ordered its deletion.
   * @memberof DeleteAction
   */
  constructor(
    type: new () => T,
    public payload: {
      entityToDelete: T;
      ownerId: any;
      ownerType: new () => any;
    }
  ) {
    this.type = new BaseCrudActionTypeNameFactory(type).Delete;
  }
}

export class DeleteSuccessAction<T> implements Action {
  public readonly type: string;
  public readonly payload: any = null;

  /**
   * Creates an instance of DeleteSuccessAction.
   * @param {new () => T} type
   * @memberof DeleteSuccessAction
   */
  constructor(type: new () => T) {
    this.type = new BaseCrudActionTypeNameFactory(type).DeleteSuccess;
  }
}

export class DeleteFailedAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of DeleteFailedAction.
   * @param {new () => T} type
   * @param {T} payload The entity wish deletion failed (For the optimistic approach)
   * @memberof DeleteFailedAction
   */
  constructor(type: new () => T, public payload: T) {
    this.type = new BaseCrudActionTypeNameFactory(type).DeleteFailed;
  }
}

export type CrudActions<T> =
  | CreateAction<T>
  | CreateSuccessAction<T>
  | CreateFailAction<T>
  | GetAllAction<T>
  | GetAllFailedAction<T>
  | GetAllSuccessAction<T>
  | GetByIdAction<T>
  | GetByIdSuccessAction<T>
  | GetByIdFailedAction<T>
  | UpdateAction<T>
  | UpdateSuccessAction<T>
  | UpdateFailedAction<T>
  | DeleteAction<T>
  | DeleteSuccessAction<T>
  | DeleteFailedAction<T>;

//#endregion
