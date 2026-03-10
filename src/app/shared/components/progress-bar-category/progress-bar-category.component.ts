import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-category',
  template: `
    <div class="category-progress ion-margin-bottom">
      <div class="info-row">
        <ion-label>
          <strong>{{ categoria }}</strong>
        </ion-label>
        <app-amount-display [monto]="monto" [tipo]="tipo" size="small"></app-amount-display>
      </div>
      <ion-progress-bar 
        [value]="porcentaje / 100" 
        [style.--progress-background]="color">
      </ion-progress-bar>
      <div class="percentage-row">
        <ion-text color="medium">
          <small>{{ porcentaje | number:'1.0-1' }}% del total de {{ tipo === 'ingreso' ? 'ingresos' : 'gastos' }}</small>
        </ion-text>
      </div>
    </div>
  `,
  styles: [`
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .info-row ion-label strong { color: var(--app-text-primary); }
    ion-progress-bar {
      height: 8px;
      border-radius: 4px;
      --buffer-background: var(--app-border);
    }
    .percentage-row {
      margin-top: 4px;
      text-align: right;
    }
  `],
  standalone: false
})
export class ProgressBarCategoryComponent {
  @Input() categoria: string = '';
  @Input() porcentaje: number = 0;
  @Input() color: string = '#3880ff';
  @Input() monto: number = 0;
  @Input() tipo: 'ingreso' | 'gasto' | 'neutral' = 'gasto';
}
