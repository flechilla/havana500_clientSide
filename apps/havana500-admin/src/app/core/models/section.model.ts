import { AuditableAndTrackableEntity } from './../../shared/models/auditable-trackable-entity.model';
export interface Section extends AuditableAndTrackableEntity<number> {
  Name: string;
  IsMainSection: boolean;
  Views: number;
  AmountOfContent: number;
}
