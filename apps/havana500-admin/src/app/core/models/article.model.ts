import { AuditableAndTrackableEntity } from '../../shared/models/auditable-trackable-entity.model';

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
  SectionId: number;

  /**
   * Gets or sets the value that represent the
   * Title of the Article.
   *
   * @type {string}
   * @memberof Article
   */
  Title: string;

  /**
   * Gets or sets the value that represents
   * the Body of the Article.
   *
   * @type {string}
   * @memberof Article
   */
  Body: string;

  /**
   * Gets or sets a value indicating whether
   * the Article comments are allowed
   *
   * @type {boolean}
   * @memberof Article
   */
  AllowComments: boolean;

  /**
   * Gets or sets a value indicating whether
   * the Article comments are allowed
   * for anonymous users.
   *
   * @type {boolean}
   * @memberof Article
   */
  AllowAnonymousComments: boolean;

  /**
   * Gets or sets the total number of approved comments
   *
   * @type {number}
   * @memberof Article
   */
  ApprovedCommentCount: number;

  /**
   * Gets or sets the total number of not approved comments
   *
   * @type {number}
   * @memberof Article
   */
  NotApprovedCommentCount: number;

  /**
   * Gets or sets the Article start date and time
   *
   * @type {Date}
   * @memberof Article
   */
  StartDateUtc?: Date;

  /**
   * Gets or sets the Article end date and time
   *
   * @type {Date}
   * @memberof Article
   */
  EndDateUtc?: Date;

  /**
   * Gets or sets the meta keywords
   *
   * @type {string}
   * @memberof Article
   */
  MetaKeywords: string;

  /**
   * Gets or sets the meta description
   *
   * @type {string}
   * @memberof Article
   */
  MetaDescription: string;

  /**
   * Gets or sets the meta title
   *
   * @type {string}
   * @memberof Article
   */
  MetaTitle: string;

  /**
   * Gets or sets the value that indicates the amount
   * of views of this Article.
   *
   * @type {number}
   * @memberof Article
   */
  Views: number;

  /**
   * Gets or sets the value that indicates the amount
   * of comments of the current Article.
   *
   *
   * @type {number}
   * @memberof Article
   */
  AmountOfComments: number;
}
