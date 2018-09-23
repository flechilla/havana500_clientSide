import { TrackableEntity } from '../../shared/models/trackable-entity.model';

export interface UserContent extends TrackableEntity<number> {
  /**
   * Gets or sets the IP address
   *
   * @type {string}
   * @memberof UserContent
   */
  ipAddress: string;

  /**
   * Gets or sets a value indicating whether the content is approved
   *
   * @type {boolean}
   * @memberof UserContent
   */
  isApproved: boolean;

  /**
   * Gets or sets the name of the User
   *
   * @type {string}
   * @memberof UserContent
   */
  userName: string;

  /**
   * Gets or sets the email of the User
   *
   * @type {string}
   * @memberof UserContent
   */
  userEmail: string;
}
