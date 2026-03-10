import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo-gallery-modal',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="dark">
        <ion-buttons slot="end">
          <ion-button (click)="cerrar()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark">
      <div class="swiper-container">
        <div class="image-wrapper">
          <img [src]="fotos[fotoInicial]" alt="Foto ampliada">
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-content { --background: #000; }
    .swiper-container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-wrapper img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  `],
  standalone: false
})
export class PhotoGalleryModalComponent {
  @Input() fotos: string[] = [];
  @Input() fotoInicial: number = 0;

  constructor(private modalCtrl: ModalController) { }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
