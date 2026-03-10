import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { TransaccionService } from './services/transaccion.service';
import { CameraService } from './services/camera.service';
import { AnalyticsService } from './services/analytics.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  providers: [
    AuthService,
    StorageService,
    TransaccionService,
    CameraService,
    AnalyticsService,
    AuthGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya fue cargado. Importar solo en AppModule.');
    }
  }
}
