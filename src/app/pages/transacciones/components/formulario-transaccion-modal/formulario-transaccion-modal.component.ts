import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaccion } from '../../../../core/models/transaccion.model';

@Component({
  selector: 'app-formulario-transaccion-modal',
  templateUrl: './formulario-transaccion-modal.component.html',
  styleUrls: ['./formulario-transaccion-modal.component.scss'],
  standalone: false
})
export class FormularioTransaccionModalComponent {
  @Input() transaccion?: Transaccion;

  constructor(private modalCtrl: ModalController) { }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  guardar(data: Transaccion) {
    this.modalCtrl.dismiss(data);
  }
}
