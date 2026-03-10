import { Pipe, PipeTransform } from '@angular/core';
import { getCategoriaIcon } from '../../core/constants/categorias.constants';

@Pipe({
    name: 'categoryIcon',
    standalone: false
})
export class CategoryIconPipe implements PipeTransform {
    transform(categoria: string): string {
        return getCategoriaIcon(categoria);
    }
}
