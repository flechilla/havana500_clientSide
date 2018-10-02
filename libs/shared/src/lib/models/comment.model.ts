import { UserContent } from './user-content.model';

export interface Comment extends UserContent {
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
}
