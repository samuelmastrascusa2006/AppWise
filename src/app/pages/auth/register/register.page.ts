import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  async onRegister() {
    if (this.registerForm.invalid) return;

    const loading = await this.loadingCtrl.create({ message: 'Creando cuenta...' });
    await loading.present();

    const success = await this.authService.register(this.registerForm.value);

    await loading.dismiss();

    if (success) {
      const toast = await this.toastCtrl.create({
        message: 'Cuenta creada con éxito.',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Error al registrar. El correo ya podría estar en uso.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }
}
