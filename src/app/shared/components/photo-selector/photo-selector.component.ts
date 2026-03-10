import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CameraService } from '../../../core/services/camera.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-photo-selector',
  template: `
    <div class="photo-selector-container">
      <div *ngIf="!fotoActual" class="placeholder" (click)="presentActionSheet()">
        <ion-icon name="camera-outline"></ion-icon>
        <p>Adjuntar Comprobante</p>
      </div>

      <div *ngIf="fotoActual" class="preview-container">
        <img [src]="fotoActual" alt="Comprobante">
        <div class="overlay-buttons">
          <ion-button fill="clear" color="light" (click)="presentActionSheet()">
            <ion-icon slot="icon-only" name="sync-outline"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="danger" (click)="onFotoEliminada.emit()">
            <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
          </ion-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .photo-selector-container {
      width: 100%;
      height: 200px;
      border: 2px dashed var(--app-text-secondary);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 16px;
      background: var(--app-surface);
    }
    .placeholder {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .placeholder ion-icon { font-size: 48px; color: var(--ion-color-medium); }
    .placeholder p { color: var(--app-text-secondary); }
    .preview-container { height: 100%; position: relative; }
    .preview-container img { width: 100%; height: 100%; object-fit: cover; }
    .overlay-buttons {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background: rgba(0,0,0,0.5);
      border-radius: 8px;
    }
  `],
  standalone: false
})
export class PhotoSelectorComponent {
  @Input() fotoActual: string | undefined;
  @Output() onFotoSeleccionada = new EventEmitter<string>();
  @Output() onFotoEliminada = new EventEmitter<void>();

  constructor(
    private cameraService: CameraService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Comprobante',
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'camera',
          handler: () => this.handleTakePhoto()
        },
        {
          text: 'Seleccionar de Galería',
          icon: 'image',
          handler: () => this.handleSelectPhoto()
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  private async handleTakePhoto() {
    const photo = await this.cameraService.tomarFoto();
    if (photo) this.onFotoSeleccionada.emit(photo);
  }

  private async handleSelectPhoto() {
    const photo = await this.cameraService.seleccionarDeGaleria();
    if (photo) this.onFotoSeleccionada.emit(photo);
  }
}
