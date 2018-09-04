import { AuditableAndTrackableEntity } from './../../shared/models/auditable-trackable-entity.model';
export interface ContentTag extends AuditableAndTrackableEntity<number> {
  Name: string;
  AmountOfContent: string;
}
