import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-field',
  template: `
    <ion-item lines="inset" [class.ion-invalid]="error" [class.ion-touched]="error">
      <ion-label position="stacked">{{ label }}</ion-label>
      <ion-select
        [value]="value"
        [placeholder]="placeholder"
        (ionChange)="onSelectChange($event)">
        <ion-select-option *ngFor="let opt of options" [value]="opt.nombre || opt.valor || opt">
          {{ opt.nombre || opt }}
        </ion-select-option>
      </ion-select>
      <ion-note slot="error" *ngIf="error">{{ error }}</ion-note>
    </ion-item>
  `,
  standalone: false
})
export class SelectFieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'Seleccionar...';
  @Input() options: any[] = [];
  @Input() value: any;
  @Input() error: string | null = null;
  @Output() onChange = new EventEmitter<any>();

  onSelectChange(event: any) {
    this.onChange.emit(event.detail.value);
  }
}
