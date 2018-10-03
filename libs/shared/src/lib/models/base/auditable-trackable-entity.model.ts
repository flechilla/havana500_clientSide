import { Entity } from './entity.models';
import { AuditableEntity } from './auditable-entity.model';
import { TrackableEntity } from './trackable-entity.model';

export interface AuditableAndTrackableEntity<Key>
  extends AuditableEntity<Key>,
    TrackableEntity<Key> {}
