import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
  standalone: false
})
export class MonthNamePipe implements PipeTransform {
  private months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  transform(value: number): string {
    return this.months[value] || '';
  }
}
