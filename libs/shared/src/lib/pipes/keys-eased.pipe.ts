import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys_eased'
})
export class KeysEasedPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const keys = [];
    for (const enumMember in value) {
      if (value.hasOwnProperty(enumMember)) {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    }

    return keys;
  }
}
