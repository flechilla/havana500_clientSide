import { AuditableAndTrackableEntity } from './../../../shared/models/auditable-trackable-entity.model';
import { PictureType } from '../enums/picture-type.enum';
export interface Picture extends AuditableAndTrackableEntity<number> {
  /**
   * Gets or sets the picture mime type
   *
   * @type {string}
   * @memberof Picture
   */
  MimeType: string;

  /**
   *Gets or sets the picture width
   *
   * @type {number}
   * @memberof Picture
   */
  Width: number;

  /**
   *Gets or sets the picture height
   *
   * @type {number}
   * @memberof Picture
   */
  Height: number;

  /**
   * Gets or sets the SEO friendly filename of the picture
   *
   * @type {string}
   * @memberof Picture
   */
  SeoFileName: string;

  /**
   *Gets or sets a value indicating whether the picture is new
   *
   * @type {boolean}
   * @memberof Picture
   */
  IsNew: boolean;

  /**
   *Gets or sets the value that represent the type of the picture.
   *
   * @type {PictureType}
   * @memberof Picture
   */
  PictureType: PictureType;

  /**
   * Gets or sets the media storage PK
   *
   * @type {number}
   * @memberof Picture
   */
  MediaStorageId: number;

  /**
   *Gets or sets the value that indicate the full path
   *to the Picture.
   *
   * @type {string}
   * @memberof Picture
   */
  FullPath: string;

  /**
   *Gets or sets the value that indicates the extension
   *of the picture.
   *
   * @type {string}
   * @memberof Picture
   */
  PictureExtension: string;
}
