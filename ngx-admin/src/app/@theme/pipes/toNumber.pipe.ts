import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toNumber'})

export class ToNumberPipe implements PipeTransform {
  transform(value: string):any {
    value = value.replace(',','');
      let retNumber = value;
      return value;
  }
}
