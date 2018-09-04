import { AuditableAndTrackableEntity } from '../../shared/models/auditable-trackable-entity.model';

export interface Article extends AuditableAndTrackableEntity<number> {
  Title: string;
  Body: string;
  AllowComments: boolean;
  AllowAnonymousComments: boolean;
  ApprovedCommentCount: number;
  NotApprovedCommentCount: number;
  StartDateUtc?: Date;
  EndDateUtc?: Date;
  MetaKeywords: string;
  MetaDescription: string;
  MetaTitle: string;
  Views: number;
  AmountOfComments: number;
}
