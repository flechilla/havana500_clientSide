import { AuditableAndTrackableEntity } from "@hav500workspace/shared";

/**
 * Represents an article of the app.
 * This can be used for the blog, for the section
 * and so.
 *
 * @export
 * @interface Article
 * @extends {AuditableAndTrackableEntity<number>}
 */
export interface ArticleCommentsInfo extends AuditableAndTrackableEntity<number> {
  
  /**
   * Gets or sets the value that represent the
   * Title of the Article.
   *
   * @type {string}
   * @memberof Article
   */
  title: string;

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
   * Gets or sets the value that indicates the amount
   * of comments of the current Article.
   *
   *
   * @type {number}
   * @memberof Article
   */
  amountOfComments: number;  
}
