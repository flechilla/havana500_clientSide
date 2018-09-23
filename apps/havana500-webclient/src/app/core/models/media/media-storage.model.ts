import { Entity } from './../../../shared/models/entity.models';

/**
 *
 *
 * @export
 * @interface MediaStorage
 * @extends {Entity<number>}
 */
export interface MediaStorage extends Entity<number> {
  data: BinaryType;
}
