import { BaseEntity } from './base-entity.model';

export interface PaginationResult<T extends BaseEntity<any>> {
  entities: T[];
  length: number;
}
