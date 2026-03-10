import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion.model';

@Pipe({
  name: 'filterByCategory',
  standalone: false
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(transacciones: Transaccion[], categoria: string): Transaccion[] {
    if (!transacciones || !categoria || categoria === 'todas') return transacciones;
    return transacciones.filter(t => t.categoria === categoria);
  }
}
