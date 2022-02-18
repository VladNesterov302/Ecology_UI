import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterCityPipe',
})
export class FilterCityPipe implements PipeTransform {
  transform(value: any, input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        return el.City.City.toLowerCase().indexOf(input) > -1;
      })
    }
    return value;
  }
}
