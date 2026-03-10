import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { Transaccion } from '../../../core/models/transaccion.model';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FormularioTransaccionModalComponent } from '../components/formulario-transaccion-modal/formulario-transaccion-modal.component';

@Component({
  selector: 'app-detalle-transaccion',
  templateUrl: './detalle-transaccion.page.html',
  styleUrls: ['./detalle-transaccion.page.scss'],
  standalone: false
})
export class DetalleTransaccionPage implements OnInit {
    transaccion?: Transaccion;

    constructor(
        private route: ActivatedRoute,
        private transaccionService: TransaccionService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private router: Router
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.transaccion = this.transaccionService.getById(id);
        }
    }

    async editar() {
        const modal = await this.modalCtrl.create({
            component: FormularioTransaccionModalComponent,
            componentProps: { transaccion: this.transaccion }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data) {
            await this.transaccionService.actualizar(data);
            this.transaccion = { ...data };
            const toast = await this.toastCtrl.create({
                message: 'Cambios guardados',
                duration: 2000,
                color: 'success'
            });
            toast.present();
        }
    }

    async confirmarEliminacion() {
        const alert = await this.alertCtrl.create({
            header: 'Confirmar eliminación',
            message: '¿Estás seguro de que deseas eliminar esta transacción?',
            buttons: [
                { text: 'Cancelar', role: 'cancel' },
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    handler: () => this.eliminar()
                }
            ]
        });

        await alert.present();
    }

    private async eliminar() {
        if (this.transaccion) {
            await this.transaccionService.eliminar(this.transaccion.id);
            const toast = await this.toastCtrl.create({
                message: 'Transacción eliminada',
                duration: 2000,
                color: 'warning'
            });
            toast.present();
            this.router.navigateByUrl('/tabs/transacciones', { replaceUrl: true });
        }
    }
}
