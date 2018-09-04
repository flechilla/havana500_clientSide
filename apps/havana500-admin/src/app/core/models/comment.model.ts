import { UserContent } from './user-content.model';
import { Discriminator } from './enums/discriminator.enum';

export interface Comment extends UserContent {
  Body: string;
  Likes: number;
  Dislikes: number;
  ParentDiscriminator: Discriminator;
}
