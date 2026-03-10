import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaccion } from '../../../core/models/transaccion.model';
import { Categoria } from '../../../core/models/transaccion.model';
import { CATEGORIAS, TIPOS_TRANSACCION } from '../../../core/constants/categorias.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  template: `
    <form [formGroup]="fg" (ngSubmit)="submit()">
      <div class="ion-padding">
        <ion-segment formControlName="tipo" mode="md">
          <ion-segment-button *ngFor="let t of tipos" [value]="t.valor">
            <ion-label>{{ t.nombre }}</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div class="form-fields ion-margin-top">
          <app-select-field
            label="Categoría"
            [options]="categoriasFiltradas"
            [value]="fg.get('categoria')?.value"
            (onChange)="fg.get('categoria')?.setValue($event)"
            [error]="getErrorMessage('categoria')">
          </app-select-field>

          <app-date-field
            label="Fecha"
            [value]="fg.get('fecha')?.value"
            (onChange)="fg.get('fecha')?.setValue($event)"
            [error]="getErrorMessage('fecha')">
          </app-date-field>

          <app-input-field
            label="Monto"
            type="number"
            placeholder="0.00"
            [value]="fg.get('monto')?.value"
            (onChange)="fg.get('monto')?.setValue($event)"
            [error]="getErrorMessage('monto')">
          </app-input-field>

          <app-input-field
            label="Descripción (opcional)"
            type="text"
            placeholder="Ej: Cena con amigos"
            [value]="fg.get('descripcion')?.value"
            (onChange)="fg.get('descripcion')?.setValue($event)">
          </app-input-field>

          <div class="photo-section ion-margin-top">
            <ion-label position="stacked" color="medium">Comprobante de pago</ion-label>
            <app-photo-selector
              [fotoActual]="fg.get('foto')?.value"
              (onFotoSeleccionada)="fg.get('foto')?.setValue($event)"
              (onFotoEliminada)="fg.get('foto')?.setValue(null)">
            </app-photo-selector>
          </div>
        </div>

        <div class="ion-margin-top footer-buttons">
          <ion-button expand="block" type="submit" [disabled]="fg.invalid">
            {{ transaccion ? 'Guardar Cambios' : 'Registrar Transacción' }}
          </ion-button>
          <ion-button expand="block" fill="clear" color="medium" (click)="onCancel.emit()">
            Cancelar
          </ion-button>
        </div>
      </div>
    </form>
  `,
  styles: [`
    .form-fields { background: var(--app-card-bg); border-radius: 12px; border: 1px solid var(--app-border); }
    .photo-section { padding: 0 16px; margin-bottom: 20px; }
    ion-label[position="stacked"] { margin-bottom: 15px; display: block; color: var(--app-text-secondary); }
    .footer-buttons { margin-bottom: 30px; }
  `],
  standalone: false
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  @Input() transaccion?: Transaccion;
  @Output() onSave = new EventEmitter<Transaccion>();
  @Output() onCancel = new EventEmitter<void>();

  fg!: FormGroup;
  categoriasFiltradas: Categoria[] = [];
  tipos = TIPOS_TRANSACCION;
  private tipoSub?: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fg = this.fb.group({
      tipo: [this.transaccion?.tipo || 'gasto', Validators.required],
      categoria: [this.transaccion?.categoria || '', Validators.required],
      fecha: [this.transaccion?.fecha || new Date().toISOString(), Validators.required],
      monto: [this.transaccion?.monto || null, [Validators.required, Validators.min(0.01)]],
      descripcion: [this.transaccion?.descripcion || ''],
      foto: [this.transaccion?.foto || null]
    });

    this.actualizarCategorias(this.fg.get('tipo')?.value);

    this.tipoSub = this.fg.get('tipo')?.valueChanges.subscribe(tipo => {
      this.actualizarCategorias(tipo);
      // Reset category if current doesn't match new type
      const catActual = this.fg.get('categoria')?.value;
      const existe = this.categoriasFiltradas.find(c => c.nombre === catActual);
      if (!existe) {
        this.fg.get('categoria')?.setValue('');
      }
    });
  }

  ngOnDestroy() {
    this.tipoSub?.unsubscribe();
  }

  private actualizarCategorias(tipo: string) {
    this.categoriasFiltradas = CATEGORIAS.filter(c => c.tipo === tipo || c.tipo === 'ambos');
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.fg.get(controlName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Este campo es obligatorio';
      if (control.errors['min']) return 'El monto debe ser mayor a 0';
    }
    return null;
  }

  submit() {
    if (this.fg.valid) {
      const data = {
        ...this.fg.value,
        id: this.transaccion?.id // Keep ID if editing
      };
      this.onSave.emit(data);
    } else {
      this.fg.markAllAsTouched();
    }
  }
}
