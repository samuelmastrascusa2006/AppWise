import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field',
  template: `
    <ion-item lines="inset" [class.ion-invalid]="error" [class.ion-touched]="error">
      <ion-label position="stacked">{{ label }}</ion-label>
      <ion-input
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        (ionInput)="onInputChange($event)">
      </ion-input>
      <ion-note slot="error" *ngIf="error">{{ error }}</ion-note>
    </ion-item>
  `,
  standalone: false
})
export class InputFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: any;
  @Input() error: string | null = null;
  @Input() disabled: boolean = false;
  @Output() onChange = new EventEmitter<any>();

  onInputChange(event: any) {
    this.onChange.emit(event.target.value);
  }
}
