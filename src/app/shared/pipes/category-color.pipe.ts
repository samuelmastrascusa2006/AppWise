import { Pipe, PipeTransform } from '@angular/core';
import { getCategoriaColor } from '../../core/constants/categorias.constants';

@Pipe({
  name: 'categoryColor',
  standalone: false
})
export class CategoryColorPipe implements PipeTransform {
  transform(categoria: string): string {
    return getCategoriaColor(categoria);
  }
}
