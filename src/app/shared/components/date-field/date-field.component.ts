import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-field',
  template: `
    <ion-item lines="inset" [class.ion-invalid]="error" [class.ion-touched]="error">
      <ion-label position="stacked">{{ label }}</ion-label>
      <ion-datetime-button datetime="datetime"></ion-datetime-button>
      <ion-modal [keepContentsMounted]="true">
        <ng-template>
          <ion-datetime
            id="datetime"
            presentation="date"
            [value]="value"
            (ionChange)="onDateChange($event)">
          </ion-datetime>
        </ng-template>
      </ion-modal>
      <ion-note slot="error" *ngIf="error">{{ error }}</ion-note>
    </ion-item>
  `,
  standalone: false
})
export class DateFieldComponent {
  @Input() label: string = 'Fecha';
  @Input() value: string = new Date().toISOString();
  @Input() error: string | null = null;
  @Output() onChange = new EventEmitter<string>();

  onDateChange(event: any) {
    this.onChange.emit(event.detail.value);
  }
}
