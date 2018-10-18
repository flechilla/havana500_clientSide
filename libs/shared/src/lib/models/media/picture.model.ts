import { PictureType } from '../enums/picture-type.enum';
import { AuditableAndTrackableEntity } from '../base/auditable-trackable-entity.model';
export interface Picture extends AuditableAndTrackableEntity<number> {
  /**
   * Gets or sets the picture mime type
   *
   * @type {string}
   * @memberof Picture
   */
  mimeType: string;

  /**
   *Gets or sets the picture width
   *
   * @type {number}
   * @memberof Picture
   */
  width: number;

  /**
   *Gets or sets the picture height
   *
   * @type {number}
   * @memberof Picture
   */
  height: number;

  /**
   * Gets or sets the SEO friendly filename of the picture
   *
   * @type {string}
   * @memberof Picture
   */
  seoFileName: string;

  /**
   *Gets or sets a value indicating whether the picture is new
   *
   * @type {boolean}
   * @memberof Picture
   */
  isNew: boolean;

  /**
   *Gets or sets the value that represent the type of the picture.
   *
   * @type {PictureType}
   * @memberof Picture
   */
  pictureType: PictureType;

  /**
   * Gets or sets the media storage PK
   *
   * @type {number}
   * @memberof Picture
   */
  mediaStorageId: number;

  /**
   *Gets or sets the value that indicate the full path
   *to the Picture.
   *
   * @type {string}
   * @memberof Picture
   */
  fullPath: string;

  /**
   *Gets or sets the value that indicate the realtive path
   *in the server to the Picture. We have to
   * prefix it the domain of the server.
   *
   * @type {string}
   * @memberof Picture
   */
  relativePath: string;

  /**
   *Gets or sets the value that indicates the extension
   *of the picture.
   *
   * @type {string}
   * @memberof Picture
   */
  pictureExtension: string;

  /**
   *Gets or sets the value that contains the url where we should
   * redirect the user after a click on the image.
   *
   * @type {string}
   * @memberof Picture
   */
  href: string;

  /**
   * Gets or sets the value that indicates that this
   * picture is active, which means that can be
   * displayed for the users.
   *
   * @type {boolean}
   * @memberof Picture
   */
  isActive: boolean;

  /**
   * Gets or sets the importance or weight of a Picture
   *
   * @type {number}
   * @memberof Picture
   */
  weight: number;

  /**
   * Gets or sets the name of the picture
   *
   * @type {string}
   * @memberof Picture
   */
  name: string;

  /**
   * Gets or sets the name of the company owning the picture
   *
   * @type {string}
   * @memberof Picture
   */
  companyName: string;

  /**
   * Gets or sets the language used for the name of the picture
   *
   * @type {string}
   * @memberof Picture
   */
  languageCulture: string;
}
