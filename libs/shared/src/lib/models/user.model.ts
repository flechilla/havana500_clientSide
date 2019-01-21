import { AuditableAndTrackableEntity } from ".";

/**
 *  Respresent a user in the system
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
   * @type {string}
   * @memberof User
   */
  emailConfirmed: string;

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
  roleName: string;
}

export class User implements IUser {
  userName: string;
  emailConfirmed: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userImageHref: string;
  roleName: string;
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
