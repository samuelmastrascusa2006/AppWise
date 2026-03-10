import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaccion } from '../../../core/models/transaccion.model';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { FormularioTransaccionModalComponent } from '../components/formulario-transaccion-modal/formulario-transaccion-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit {
  transaccionesFiltradas$!: Observable<Transaccion[]>;

  filtroTipo$ = new BehaviorSubject<string>('todos');
  filtroCategoria$ = new BehaviorSubject<string>('todas');
  filtroTexto$ = new BehaviorSubject<string>('');

  constructor(
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.transaccionesFiltradas$ = combineLatest([
      this.transaccionService.transacciones$,
      this.filtroTipo$,
      this.filtroCategoria$,
      this.filtroTexto$
    ]).pipe(
      map(([list, tipo, cat, texto]) => {
        let filtered = [...list];

        if (tipo !== 'todos') filtered = filtered.filter(t => t.tipo === tipo);
        if (cat !== 'todas') filtered = filtered.filter(t => t.categoria === cat);
        if (texto) {
          const q = texto.toLowerCase();
          filtered = filtered.filter(t =>
            t.descripcion?.toLowerCase().includes(q) || t.categoria.toLowerCase().includes(q)
          );
        }

        return filtered;
      })
    );
  }

  limpiarFiltros() {
    this.filtroTipo$.next('todos');
    this.filtroCategoria$.next('todas');
    this.filtroTexto$.next('');
  }

  async presentModal(transaccion?: Transaccion) {
    const modal = await this.modalCtrl.create({
      component: FormularioTransaccionModalComponent,
      componentProps: { transaccion }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data.id) {
        await this.transaccionService.actualizar(data);
        this.showToast('Transacción actualizada');
      } else {
        await this.transaccionService.crear(data);
        this.showToast('Transacción registrada');
      }
    }
  }

  verDetalle(id: string) {
    this.router.navigate(['/tabs/transacciones/detalle', id]);
  }

  logout() {
    this.authService.logout();
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color: 'success' });
    toast.present();
  }
}
