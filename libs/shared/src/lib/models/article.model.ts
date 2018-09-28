import { AuditableAndTrackableEntity } from './base/auditable-trackable-entity.model';

/**
 * Represents an article of the app.
 * This can be used for the blog, for the section
 * and so.
 *
 * @export
 * @interface Article
 * @extends {AuditableAndTrackableEntity<number>}
 */
export interface Article extends AuditableAndTrackableEntity<number> {
  /**
   * Gets or sets the FK to the parent section
   * of this article.
   *
   * @type {number}
   * @memberof Article
   */
  sectionId: number;

  /**
   * Gets or sets the value that represent the
   * Title of the Article.
   *
   * @type {string}
   * @memberof Article
   */
  title: string;

  /**
   * Gets or sets the value that represents
   * the Body of the Article.
   *
   * @type {string}
   * @memberof Article
   */
  body: string;

  /**
   * Gets or sets a value indicating whether
   * the Article comments are allowed
   *
   * @type {boolean}
   * @memberof Article
   */
  allowComments: boolean;

  /**
   * Gets or sets a value indicating whether
   * the Article comments are allowed
   * for anonymous users.
   *
   * @type {boolean}
   * @memberof Article
   */
  allowAnonymousComments: boolean;

  /**
   * Gets or sets the total number of approved comments
   *
   * @type {number}
   * @memberof Article
   */
  approvedCommentCount: number;

  /**
   * Gets or sets the total number of not approved comments
   *
   * @type {number}
   * @memberof Article
   */
  notApprovedCommentCount: number;

  /**
   * Gets or sets the Article start date and time
   *
   * @type {Date}
   * @memberof Article
   */
  startDateUtc?: Date;

  /**
   * Gets or sets the Article end date and time
   *
   * @type {Date}
   * @memberof Article
   */
  endDateUtc?: Date;

  /**
   * Gets or sets the meta keywords
   *
   * @type {string}
   * @memberof Article
   */
  metaKeywords: string;

  /**
   * Gets or sets the meta description
   *
   * @type {string}
   * @memberof Article
   */
  metaDescription: string;

  /**
   * Gets or sets the meta title
   *
   * @type {string}
   * @memberof Article
   */
  metaTitle: string;

  /**
   * Gets or sets the value that indicates the amount
   * of views of this Article.
   *
   * @type {number}
   * @memberof Article
   */
  views: number;

  /**
   * Gets or sets the value that indicates the amount
   * of comments of the current Article.
   *
   *
   * @type {number}
   * @memberof Article
   */
  amountOfComments: number;

  /**
   * Gets or sets the value that indicates the weight for the current
   * Article.!-- This is used for the algorithm to sort the articles.
   *
   * @type {number}
   * @memberof Article
   */
  weight: number;

  /**
   *Gets or sets the value that indicate the initial
   *weight for the current entity. This value is assigned
   *by the editor of the article depending on its importance.
   *
   * @type {number}
   * @memberof Article
   */
  editorWeight: number;

  /**
   *Gets or sets the value that indicates
   *the amount of minutes that takes
   *to read the article.
   *
   * @type {number}
   * @memberof Article
   */
  readingTime: number;
}
