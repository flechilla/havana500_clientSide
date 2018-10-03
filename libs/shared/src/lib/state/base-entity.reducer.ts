import { BaseCrudActionTypeNameFactory } from './base-crud-typename-factory';
import * as crudActions from './base-crud.actions';
import { BaseEntityState } from './base-entity.state';
import { BaseEntity } from '../models';

/**
 * Modify the state responding to CRUD Actions.
 *
 * @export
 * @template T
 * @param {new () => T} type Type of the entity which state is being manipulated
 * @param {BaseEntityState<T>} state State of the entity
 * @param {crudActions.CrudActions<T>} action Dispatched Action
 * @returns {BaseEntityState<T>} New State
 */
export function baseReducer<T extends BaseEntity<any>>(
  type: new () => T,
  state: BaseEntityState<T>,
  action: crudActions.CrudActions<T>
): BaseEntityState<T> {
  const actionTypes = new BaseCrudActionTypeNameFactory(type);

  if (!action) {
    return state;
  }

  if (action.type === actionTypes.Create) {
    const payload = (<crudActions.CreateAction<T>>action).payload;
    return {
      ...state,
      entities: state.entities.set(
        payload.entityToCreate.id,
        payload.entityToCreate
      )
    };
  }
  if (action.type === actionTypes.CreateSuccess) {
    const payload = (<crudActions.CreateSuccessAction<T>>action).payload;
    return {
      ...state,
      entities: state.entities
        .delete(payload.oldId)
        .set(payload.createdEntity.id, payload.createdEntity)
    };
  }
  if (action.type === actionTypes.CreateFailed) {
    const payload = (<crudActions.CreateFailAction<T>>action).payload;

    return {
      ...state,
      entities: state.entities.delete(payload)
    };
  }
  if (action.type === actionTypes.GetById) {
    return {
      ...state,
      loading: true
    };
  }
  if (action.type === actionTypes.GetByIdSuccess) {
    return {
      ...state,
      loading: false,
      entities: state.entities.set(action.payload.id, action.payload)
    };
  }
  if (action.type === actionTypes.GetByIdFailed) {
    return {
      ...state,
      loading: false
    };
  }
  if (action.type === actionTypes.Update) {
    return {
      ...state,
      entities: state.entities.set(
        action.payload.newEntity.id,
        action.payload.newEntity
      )
    };
  }
  if (action.type === actionTypes.UpdateSuccess) {
    return {
      ...state,
      entities: state.entities.set(action.payload.id, action.payload)
    };
  }
  if (action.type === actionTypes.UpdateFailed) {
    return {
      ...state,
      entities: state.entities.set(action.payload.id, action.payload)
    };
  }
  if (action.type === actionTypes.Delete) {
    const payload = (<crudActions.DeleteAction<T>>action).payload;
    return {
      ...state,
      entities: state.entities.delete(payload.entityToDelete.id)
    };
  }
  if (action.type === actionTypes.DeleteFailed) {
    const payload = (<crudActions.DeleteFailedAction<T>>action).payload;

    return {
      ...state,
      entities: state.entities.set(payload.id, payload)
    };
  }
  return state;
}
