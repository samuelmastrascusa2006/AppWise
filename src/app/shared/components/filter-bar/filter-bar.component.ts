import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CATEGORIAS } from '../../../core/constants/categorias.constants';

@Component({
  selector: 'app-filter-bar',
  template: `
    <div class="filter-bar">
      <ion-searchbar
        [placeholder]="'Buscar descripción...'"
        (ionInput)="onBuscarChange.emit($any($event).detail.value)"
        debounce="300"
        class="ion-no-padding">
      </ion-searchbar>

      <div class="filters-row">
        <ion-segment [value]="tipoSeleccionado" (ionChange)="onTipoChange.emit($any($event).detail.value)">
          <ion-segment-button value="todos"><ion-label>Todos</ion-label></ion-segment-button>
          <ion-segment-button value="ingreso"><ion-label>Ingresos</ion-label></ion-segment-button>
          <ion-segment-button value="gasto"><ion-label>Gastos</ion-label></ion-segment-button>
        </ion-segment>

        <ion-item lines="none" class="category-filter">
          <ion-select
            [value]="categoriaSeleccionada"
            interface="popover"
            placeholder="Categoría"
            (ionChange)="onCategoriaChange.emit($any($event).detail.value)">
            <ion-select-option value="todas">Todas las categorías</ion-select-option>
            <ion-select-option *ngFor="let cat of categorias" [value]="cat.nombre">
              {{ cat.nombre }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </div>
    </div>
  `,
  styles: [`
    .filter-bar { padding: 8px 16px; background: var(--app-surface); border-bottom: 1px solid var(--app-border); }
    .filters-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
    ion-segment { flex: 2; min-width: 200px; }
    .category-filter { 
      flex: 1.5; 
      --background: var(--app-card-bg); 
      border-radius: 8px; 
      min-height: 40px;
      min-width: 150px;
      font-size: 0.9rem;
    }
    ion-select { width: 100%; }
    @media (max-width: 480px) {
      .filters-row { flex-direction: column; }
      ion-segment, .category-filter { flex: 1; width: 100%; min-width: unset; }
    }
  `],
  standalone: false
})
export class FilterBarComponent {
  @Input() tipoSeleccionado: string | null = 'todos';
  @Input() categoriaSeleccionada: string | null = 'todas';
  @Output() onTipoChange = new EventEmitter<string>();
  @Output() onCategoriaChange = new EventEmitter<string>();
  @Output() onBuscarChange = new EventEmitter<string>();

  categorias = CATEGORIAS;
}
