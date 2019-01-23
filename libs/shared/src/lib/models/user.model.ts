import { AuditableAndTrackableEntity } from ".";

/**
 *  Respresents a user in the system
 *
 * @export
 * @interface User
 * @extends {AuditableAndTrackableEntity<string>}
 */
export interface IUser extends AuditableAndTrackableEntity<string> {

  /**
   *  The nickname of the user
   *
   * @type {string}
   * @memberof User
   */
  userName: string;

  /**
   * The user email
   *
   * @type {string}
   * @memberof User
   */
  email: string;

  /**
   *  Indicates that the user has confirmed the email
   *
   * @type {boolean}
   * @memberof User
   */
  emailConfirmed: boolean;

  phoneNumber: string;

  firstName: string;

  lastName: string;

  /**
   * The ref for the image of the user.
   * User this in the `src` of the img tag
   *
   * @type {string}
   * @memberof User
   */
  userImageHref: string;

  /**
   * The User's role
   *
   * @type {string}
   * @memberof User
   */
  role: string;
}

export class User implements IUser {
  userName: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userImageHref: string;
  role: string;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  modifiedAt: Date;
  constructor(
    public id: string = null,
    public email: string = null,
    public username: string = null,
    public token: string = null
  ) {}
}
