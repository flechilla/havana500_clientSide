import { AuditableAndTrackableEntity } from './../../../shared/models/auditable-trackable-entity.model';
import { PictureType } from '../enums/picture-type.enum';
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
   *Gets or sets the value that indicates the extension
   *of the picture.
   *
   * @type {string}
   * @memberof Picture
   */
  pictureExtension: string;
}
