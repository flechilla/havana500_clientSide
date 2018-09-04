import { TrackableEntity } from '../../shared/models/trackable-entity.model';

export interface UserContent extends TrackableEntity<number> {
  IpAddress: string;
  IsApproved: boolean;
}
