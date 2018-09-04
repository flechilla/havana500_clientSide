import { Entity } from './entity.models';

export interface AuditableEntity<Key> extends Entity<Key> {
  CreatedBy: string;
  ModifiedBy: string;
}
