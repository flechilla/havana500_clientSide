import { ContentLevel } from './enums/content-level.enum';
import { Picture } from '.';
import { AuditableAndTrackableEntity } from './base';

export interface MarketingContent extends AuditableAndTrackableEntity<number> {
  name: string;
  companyName: string;
  contentLevel: ContentLevel;
  isActive: boolean;
  weight: number;
  picture: Picture;
}
