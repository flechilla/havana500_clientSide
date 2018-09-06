import { UserContent } from './user-content.model';
import { Discriminator } from './enums/discriminator.enum';

export interface Comment extends UserContent {
  /**
   * Gets or sets the FK to the related Parent
   *
   * @type {number}
   * @memberof Comment
   */
  ParentId: number;

  /**
   * Gets or sets the discriminator for the parent of the Comment
   *
   * @type {Discriminator}
   * @memberof Comment
   */
  ParentDiscriminator: Discriminator;

  /**
   * Gets or sets the body for the Comment
   *
   * @type {string}
   * @memberof Comment
   */
  Body: string;

  /**
   * Gets or sets the amount of likes for the current comment.
   *
   * @type {number}
   * @memberof Comment
   */
  Likes: number;

  /**
   * Gets or sets the amount of dislikes of the current comment
   *
   * @type {number}
   * @memberof Comment
   */
  Dislikes: number;
}
