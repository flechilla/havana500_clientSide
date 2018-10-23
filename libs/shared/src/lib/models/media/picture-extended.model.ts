import { Picture } from '.';
import { ContentTag } from '..';

export interface PictureExtended extends Picture {
  tags: ContentTag[];
}
