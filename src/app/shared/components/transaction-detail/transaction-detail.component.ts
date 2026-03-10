import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaccion } from '../../../core/models/transaccion.model';
import { ModalController } from '@ionic/angular';
import { PhotoGalleryModalComponent } from '../photo-gallery-modal/photo-gallery-modal.component';

@Component({
  selector: 'app-transaction-detail',
  template: `
    <ion-card class="detail-card">
      <div class="header-section" [style.background-color]="transaccion.categoria | categoryColor">
        <div class="cat-icon-large">
          <ion-icon [name]="transaccion.categoria | categoryIcon"></ion-icon>
        </div>
      </div>

      <ion-card-content class="ion-padding">
        <div class="monto-destacado ion-text-center ion-margin-bottom">
          <app-amount-display [monto]="transaccion.monto" [tipo]="transaccion.tipo" size="large"></app-amount-display>
          <p class="fecha-label">{{ transaccion.fecha | dateFormat }}</p>
        </div>

        <ion-list lines="none">
          <ion-item>
            <ion-label>
              <p>Categoría</p>
              <h3>{{ transaccion.categoria }}</h3>
            </ion-label>
            <ion-badge slot="end" [color]="transaccion.tipo === 'ingreso' ? 'success' : 'danger'">
              {{ transaccion.tipo | titlecase }}
            </ion-badge>
          </ion-item>

          <ion-item *ngIf="transaccion.descripcion">
            <ion-label>
              <p>Descripción</p>
              <h3>{{ transaccion.descripcion }}</h3>
            </ion-label>
          </ion-item>
        </ion-list>

        <div *ngIf="transaccion.foto" class="ion-margin-top">
          <ion-label color="medium"><p>Comprobante</p></ion-label>
          <app-photo-preview [src]="transaccion.foto" size="large" (onClick)="verFoto()"></app-photo-preview>
        </div>

        <div class="action-buttons ion-margin-top">
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button expand="block" shape="round" color="secondary" (click)="onEdit.emit()">
                  <ion-icon slot="start" name="create-outline"></ion-icon>
                  Editar
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button expand="block" shape="round" color="danger" fill="outline" (click)="onDelete.emit()">
                  <ion-icon slot="start" name="trash-outline"></ion-icon>
                  Eliminar
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .detail-card { margin: 0; border-radius: 0; box-shadow: none; border: none; }
    .header-section { height: 120px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border-bottom-left-radius: 40% 20px; border-bottom-right-radius: 40% 20px; }
    .cat-icon-large { font-size: 64px; color: white; }
    .monto-destacado h1 { font-size: 2.5rem; margin: 8px 0; }
    .fecha-label { color: var(--app-text-secondary); margin-top: -4px; }
    h3 { font-weight: bold; font-size: 1.1rem; margin-top: 4px; color: var(--app-text-primary); }
    p { color: var(--app-text-secondary); }
    .detail-card ion-item { --padding-start: 0; }
    @media (min-width: 768px) {
      .detail-card { max-width: 600px; margin: 16px auto; border-radius: 16px !important; border: 1px solid var(--app-border) !important; }
    }
  `],
  standalone: false
})
export class TransactionDetailComponent {
  @Input() transaccion!: Transaccion;
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  constructor(private modalCtrl: ModalController) { }

  async verFoto() {
    if (!this.transaccion.foto) return;
    const modal = await this.modalCtrl.create({
      component: PhotoGalleryModalComponent,
      componentProps: {
        fotos: [this.transaccion.foto],
        fotoInicial: 0
      },
      cssClass: 'fullscreen-modal'
    });
    return await modal.present();
  }
}
