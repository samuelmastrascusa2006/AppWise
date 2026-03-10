import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo-preview',
  template: `
    <div class="photo-preview" [ngClass]="size" (click)="onClick.emit()">
      <ion-thumbnail *ngIf="size === 'small'">
        <img [src]="src" alt="Comprobante mini">
      </ion-thumbnail>
      
      <div *ngIf="size !== 'small'" class="preview-large">
        <img [src]="src" alt="Comprobante">
        <ion-badge color="light" class="zoom-badge">
          <ion-icon name="search-outline"></ion-icon>
          Ampliar
        </ion-badge>
      </div>
    </div>
  `,
  styles: [`
    .photo-preview { cursor: pointer; }
    .preview-large { position: relative; border-radius: 12px; overflow: hidden; }
    .preview-large img { width: 100%; height: auto; display: block; }
    .zoom-badge { position: absolute; bottom: 10px; right: 10px; display: flex; align-items: center; gap: 4px; }
  `],
  standalone: false
})
export class PhotoPreviewComponent {
  @Input() src: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() onClick = new EventEmitter<void>();
}
