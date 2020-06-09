import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ngxNumberWithCommas' })
export class NumberWithCommasPipe implements PipeTransform {

  transform(input: number): string {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return new Intl.NumberFormat().format(input);
  }
}
