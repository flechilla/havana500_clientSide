import { Entity } from './entity.models';

export interface AuditableEntity<Key> extends Entity<Key> {
  createdBy: string;
  modifiedBy: string;
}
