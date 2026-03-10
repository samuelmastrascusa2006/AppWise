import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-container ion-padding ion-text-center">
      <ion-icon [name]="icono" color="medium"></ion-icon>
      <ion-text color="medium">
        <p>{{ mensaje }}</p>
      </ion-text>
      <ion-button *ngIf="accion" fill="outline" shape="round" (click)="onAccion.emit()">
        {{ accion }}
      </ion-button>
    </div>
  `,
  styles: [`
    .empty-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 200px;
    }
    ion-icon { font-size: 64px; margin-bottom: 16px; color: var(--app-text-secondary); }
    p { font-size: 1.1rem; margin-bottom: 24px; color: var(--app-text-secondary); }
  `],
  standalone: false
})
export class EmptyStateComponent {
  @Input() mensaje: string = 'No hay datos para mostrar';
  @Input() icono: string = 'document-text-outline';
  @Input() accion: string = '';
  @Output() onAccion = new EventEmitter<void>();
}
