import { UserContent } from './user-content.model';
import { Discriminator } from './enums/discriminator.enum';

export class CommentModel implements UserContent {
  /**
   * @param  {number} articleId
   * @param  {string} body
   * @param  {string} userName?
   * @param  {string} userEmail?
   */
  constructor(
    articleId: number,
    body: string,
    userName?: string,
    userEmail?: string
  ) {
    this.body = body;
    this.userEmail = userEmail;
    this.userName = userName;
    this.articleId = articleId;
  }

  ipAddress: string;
  isApproved: boolean;
  createdAt: Date;
  modifiedAt: Date;
  id: number;

  /**
   * Gets or sets the FK to the related Article
   *
   * @type {number}
   * @memberof Comment
   */
  articleId: number;

  /**
   * Gets or sets the body for the Comment
   *
   * @type {string}
   * @memberof Comment
   */
  body: string;

  /**
   * Gets or sets the user name
   *
   * @type {string}
   * @memberof Comment
   */
  userName?: string;

  /**
   * Gets or sets the user email
   *
   * @type {string}
   * @memberof Comment
   */
  userEmail?: string;

  /**
   * Gets or sets the amount of likes for the current comment.
   *
   * @type {number}
   * @memberof Comment
   */
  likes: number;

  /**
   * Gets or sets the amount of dislikes of the current comment
   *
   * @type {number}
   * @memberof Comment
   */
  dislikes: number;

  /**
   * Gets or sets the creation date of the current comment.
   * This value is in Human 'readable'.
   *
   * @type {string}
   * @memberof Comment
   */
  createdAtHumanized: string;
}
