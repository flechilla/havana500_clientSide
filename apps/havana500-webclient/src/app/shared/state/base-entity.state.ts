import { Map, List } from 'immutable';

export interface BaseEntityState<T> {
  entities: Map<any, T>;
  loading: boolean;
}

export interface BaseOwnerState<O, D> extends BaseEntityState<O> {
  dependents: Map<any, Map<new () => D, List<any>>>;
}
