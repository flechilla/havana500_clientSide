import { Entity } from './entity.models';

export interface TrackableEntity<Key> extends Entity<Key> {
  createdAt: Date;
  modifiedAt: Date;
}
