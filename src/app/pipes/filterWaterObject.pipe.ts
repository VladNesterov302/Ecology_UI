import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterWaterObjectPipe',
})
export class FilterWaterObjectPipe implements PipeTransform {
  transform(value: any, input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        return el.WaterObject.WaterObject.toLowerCase().indexOf(input) > -1;
      })
    }
    return value;
  }
}
