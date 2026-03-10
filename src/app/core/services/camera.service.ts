import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({ providedIn: 'root' })
export class CameraService {

  constructor() { }

  async tomarFoto(): Promise<string | undefined> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      return image.base64String ? `data:image/${image.format};base64,${image.base64String}` : undefined;
    } catch (error) {
      console.warn('Camera cancelled or error:', error);
      return undefined;
    }
  }

  async seleccionarDeGaleria(): Promise<string | undefined> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });
      return image.base64String ? `data:image/${image.format};base64,${image.base64String}` : undefined;
    } catch (error) {
      console.warn('Gallery cancelled or error:', error);
      return undefined;
    }
  }
}
