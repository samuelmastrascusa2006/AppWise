import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  template: `
    <ion-card [class]="tipo">
      <ion-card-content>
        <div class="card-layout">
          <div class="icon-section">
            <ion-icon [name]="icono"></ion-icon>
          </div>
          <div class="content-section">
            <ion-text color="medium">
              <span class="titulo">{{ titulo }}</span>
            </ion-text>
            <div class="monto-wrapper">
              <app-amount-display [monto]="monto" [tipo]="tipo === 'saldo' ? 'neutral' : tipo" size="large"></app-amount-display>
            </div>
          </div>
        </div>
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    ion-card { 
      margin: 8px 0; 
      border-radius: 16px;
      box-shadow: 0 2px 8px var(--app-border);
    }
    .card-layout { display: flex; align-items: center; }
    .icon-section {
      background: rgba(var(--ion-color-primary-rgb), 0.15);
      padding: 12px;
      border-radius: 12px;
      margin-right: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ion-icon { font-size: 28px; color: var(--ion-color-primary); }
    .ingreso .icon-section { background: rgba(var(--ion-color-success-rgb), 0.15); }
    .ingreso ion-icon { color: var(--ion-color-success); }
    .gasto .icon-section { background: rgba(var(--ion-color-danger-rgb), 0.15); }
    .gasto ion-icon { color: var(--ion-color-danger); }
    .titulo { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--app-text-secondary); }
    .monto-wrapper { margin-top: 4px; }
  `],
  standalone: false
})
export class DashboardCardComponent {
  @Input() titulo: string = '';
  @Input() monto: number = 0;
  @Input() tipo: 'ingreso' | 'gasto' | 'saldo' = 'saldo';
  @Input() icono: string = 'wallet-outline';
}
