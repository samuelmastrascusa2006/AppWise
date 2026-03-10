import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion.model';

@Pipe({
  name: 'filterByType',
  standalone: false
})
export class FilterByTypePipe implements PipeTransform {
  transform(transacciones: Transaccion[], tipo: string): Transaccion[] {
    if (!transacciones || !tipo || tipo === 'todos') return transacciones;
    return transacciones.filter(t => t.tipo === tipo);
  }
}
