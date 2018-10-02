import { AuditableAndTrackableEntity } from './base/auditable-trackable-entity.model';

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
  parentSectionId: number;

  /**
   *The name of the section
   *
   * @type {string}
   * @memberof Section
   */
  name: string;

  /**
   *Gets or sets the Description of the current Section.
   *This is an optional data.
   *
   * @type {string}
   * @memberof Section
   */
  description: string;

  /**
   *If true indicate that this instance is a root,
   *so it may contains other sections and should by
   *used in the header.
   *
   * @type {boolean}
   * @memberof Section
   */
  isMainSection: boolean;

  /**
   *Gets or sets the value that indicates the
   *amount of times that the user has entered
   *to this section.
   *
   * @type {number}
   * @memberof Section
   */
  views: number;

  /**
   *Gets or sets the value that indicates the
   *amount of comments that the section has.
   *
   * @type {number}
   * @memberof Section
   */
  amountOfComments: number;

  /**
   *Gets or sets the value that indicates the
   *amount of articles that the section has.
   *
   * @type {number}
   * @memberof Section
   */
  amountOfArticles: number;
}
