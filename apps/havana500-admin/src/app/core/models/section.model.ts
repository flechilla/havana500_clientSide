import { AuditableAndTrackableEntity } from './../../shared/models/auditable-trackable-entity.model';

/**
 * This entity represent the outer container of data
 * in the app. Its work as the elements of the header and
 * is direct container of subSections
 *
 * @export
 * @interface Section
 * @extends {AuditableAndTrackableEntity<number>}
 */
export interface Section extends AuditableAndTrackableEntity<number> {
  /**
   * Gets or sets the value that indicates
   *the container of the current section.
   *
   * @type {number}
   * @memberof Section
   */
  ParentSectionId: number;

  /**
   *The name of the section
   *
   * @type {string}
   * @memberof Section
   */
  Name: string;

  /**
   *If true indicate that this instance is a root,
   *so it may contains other sections and should by
   *used in the header.
   *
   * @type {boolean}
   * @memberof Section
   */
  IsMainSection: boolean;

  /**
   *Gets or sets the value that indicates the
   *amount of times that the user has entered
   *to this section.
   *
   * @type {number}
   * @memberof Section
   */
  Views: number;

  /**
   *Gets or sets the value that indicates the
   *amount of comments that the section has.
   *
   * @type {number}
   * @memberof Section
   */
  AmountOfContent: number;
}
