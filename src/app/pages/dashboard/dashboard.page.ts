import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics.service';
import { AuthService } from '../../core/services/auth.service';
import { TransaccionService } from '../../core/services/transaccion.service';
import { Observable } from 'rxjs';
import { ResumenFinanciero, Transaccion } from '../../core/models/transaccion.model';
import { User } from '../../core/models/user.model';
import { ModalController, ToastController } from '@ionic/angular';
import { FormularioTransaccionModalComponent } from '../transacciones/components/formulario-transaccion-modal/formulario-transaccion-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  resumen$!: Observable<ResumenFinanciero>;
  user$!: Observable<User | null>;

  constructor(
    private analyticsService: AnalyticsService,
    private authService: AuthService,
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.resumen$ = this.analyticsService.getResumenFinanciero();
    this.user$ = this.authService.user$;
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: FormularioTransaccionModalComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      await this.transaccionService.crear(data);
      const toast = await this.toastCtrl.create({ message: 'Transacción registrada', duration: 2000, color: 'success' });
      toast.present();
    }
  }

  logout() {
    this.authService.logout();
  }
}
