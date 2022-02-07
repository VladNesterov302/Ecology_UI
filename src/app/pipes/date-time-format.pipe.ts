import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateTimeFormatPipe',
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'dd-MM-yyyy HH:mm:ss');
    return value;
  }
}
