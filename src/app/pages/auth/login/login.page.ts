import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) return;

    const loading = await this.loadingCtrl.create({ message: 'Autenticando...' });
    await loading.present();

    const { email, password } = this.loginForm.value;
    const success = await this.authService.login(email, password);

    await loading.dismiss();

    if (success) {
      this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Credenciales inválidas. Intenta de nuevo.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  }
}
