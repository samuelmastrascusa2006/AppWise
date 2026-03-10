import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaccion } from '../../../core/models/transaccion.model';

@Component({
  selector: 'app-transaction-item',
  template: `
    <ion-item (click)="onClick.emit()" detail="true" lines="full">
      <ion-avatar slot="start" [style.background-color]="transaccion.categoria | categoryColor" class="cat-avatar">
        <ion-icon [name]="transaccion.categoria | categoryIcon"></ion-icon>
      </ion-avatar>
      
      <ion-label>
        <h2>{{ transaccion.descripcion || transaccion.categoria }}</h2>
        <p>{{ transaccion.fecha | dateFormat }} • {{ transaccion.categoria }}</p>
      </ion-label>

      <div slot="end" class="ion-text-right">
        <app-amount-display [monto]="transaccion.monto" [tipo]="transaccion.tipo"></app-amount-display>
        <div *ngIf="transaccion.foto" class="receipt-indicator">
          <ion-icon name="image-outline"></ion-icon>
          <small>Comprobante</small>
        </div>
      </div>
    </ion-item>
  `,
  styles: [`
    .cat-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
    }
    ion-item { --background: var(--app-surface); }
    ion-label h2 { color: var(--app-text-primary); font-weight: 600; }
    ion-label p { color: var(--app-text-secondary); }
    .receipt-indicator {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
      color: var(--app-text-secondary);
      margin-top: 4px;
    }
  `],
  standalone: false
})
export class TransactionItemComponent {
  @Input() transaccion!: Transaccion;
  @Output() onClick = new EventEmitter<void>();
}
