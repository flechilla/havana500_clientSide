import { AuditableAndTrackableEntity } from './../../shared/models/auditable-trackable-entity.model';

/**
 * Represent a tag that can be assigned to any
 * content (i.e Section, Article...)
 *
 * @export
 * @interface ContentTag
 * @extends {AuditableAndTrackableEntity<number>}
 */
export interface ContentTag extends AuditableAndTrackableEntity<number> {
  /**
   * Gets or sets the name of the Tag.
   *
   * @type {string}
   * @memberof ContentTag
   */
  name: string;

  /**
   * Gets or sets the value that indicates the amount
   * of times that the tag has been used.
   *
   * @type {string}
   * @memberof ContentTag
   */
  amountOfContent: string;
}
