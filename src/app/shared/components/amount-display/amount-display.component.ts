import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amount-display',
  template: `
    <ion-text [color]="getColor()" [class.large]="size === 'large'" [class.medium]="size === 'medium'">
      <span class="monto">{{ monto | currencyFormat }}</span>
    </ion-text>
  `,
  styles: [`
    ion-text { font-weight: bold; }
    .large { font-size: 1.5rem; }
    .medium { font-size: 1.2rem; }
  `],
  standalone: false
})
export class AmountDisplayComponent {
  @Input() monto: number = 0;
  @Input() tipo: 'ingreso' | 'gasto' | 'neutral' = 'neutral';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  getColor(): string {
    if (this.tipo === 'ingreso') return 'success';
    if (this.tipo === 'gasto') return 'danger';
    return 'medium';
  }
}
