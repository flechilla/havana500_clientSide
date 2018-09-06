import { TrackableEntity } from '../../shared/models/trackable-entity.model';

export interface UserContent extends TrackableEntity<number> {
  /**
   * Gets or sets the IP address
   *
   * @type {string}
   * @memberof UserContent
   */
  IpAddress: string;

  /**
   * Gets or sets a value indicating whether the content is approved
   *
   * @type {boolean}
   * @memberof UserContent
   */
  IsApproved: boolean;
}
