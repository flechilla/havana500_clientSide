import { Injectable } from '@angular/core';
import { now } from 'moment';
import { List } from 'immutable';
import { isNullOrUndefined } from 'util';
import { BaseEntity } from '../../models';

@Injectable()
export class AntUtilsService {
  constructor() {}

  /**
   * Returns a string with at least 64-bits of randomness.
   *
   * Doesn't trust Javascript's random function entirely. Uses a combination of
   * random and current timestamp, and then encodes the string in base-36 to
   * make it shorter.
   *
   * @return {string} A random string, e.g. sn1s7vb4gcic.
   */
  generateUEId(): any {
    const x = 2147483648;
    return (
      Math.floor(Math.random() * x).toString(36) +
      Math.abs(Math.floor(Math.random() * x) ^ now()).toString(36)
    );
  }

  trackById(index, element: BaseEntity<any>) {
    // if(element)
    return element.id;
  }

  entityComparer(x: BaseEntity<number>, y: BaseEntity<number>): boolean {
    if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
      return true;
    }
    if (isNullOrUndefined(x)) {
      return false;
    }
    if (isNullOrUndefined(y)) {
      return false;
    }
    return x.id === y.id;
  }

  enumComparer(x: any, y: any): boolean {
    return x == y;
  }

  listComparer(x: List<any>, y: List<any>): boolean {
    if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
      return true;
    }
    if (isNullOrUndefined(x)) {
      return false;
    }
    if (isNullOrUndefined(y)) {
      return false;
    }
    return x.equals(y);
  }

  listEntityComparer(
    x: List<BaseEntity<number>>,
    y: List<BaseEntity<number>>
  ): boolean {
    if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
      return true;
    }
    if (isNullOrUndefined(x)) {
      return false;
    }
    if (isNullOrUndefined(y)) {
      return false;
    }
    if (x.count() !== y.count()) {
      return false;
    }
    for (let index = 0; index < x.count(); index++) {
      const xi: BaseEntity<number> = x[index];
      const yi: BaseEntity<number> = y[index];

      if (this && !this.entityComparer(xi, yi)) {
        return false;
      }
    }

    return true;
  }
}
