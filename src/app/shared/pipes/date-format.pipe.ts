import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: false
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (this.isSameDay(date, today)) return 'Hoy';
    if (this.isSameDay(date, yesterday)) return 'Ayer';

    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
}
