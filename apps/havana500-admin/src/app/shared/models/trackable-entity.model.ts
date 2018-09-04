import { Entity } from './entity.models';

export interface TrackableEntity<Key> extends Entity<Key> {
  CreatedAt: Date;
  ModifiedAt: Date;
}
