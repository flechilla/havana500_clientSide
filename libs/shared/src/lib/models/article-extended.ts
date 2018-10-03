import { Article } from './article.model';
import { ContentTag } from './content-tag.model';
export interface ArticleExtended extends Article {
  /**
   *Gets or sets the Article tags
   *
   * @type {ContentTag[]}
   * @memberof Article
   */
  tags: ContentTag[];
}
