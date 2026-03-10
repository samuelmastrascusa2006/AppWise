import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion.model';

@Pipe({
  name: 'searchByText',
  standalone: false
})
export class SearchByTextPipe implements PipeTransform {
  transform(transacciones: Transaccion[], searchText: string): Transaccion[] {
    if (!transacciones || !searchText) return transacciones;
    const query = searchText.toLowerCase();
    return transacciones.filter(t =>
      t.descripcion?.toLowerCase().includes(query) ||
      t.categoria.toLowerCase().includes(query)
    );
  }
}
