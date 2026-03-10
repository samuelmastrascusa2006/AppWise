import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

const TRANSACTIONS_PREFIX = 'moneywise_transacciones_';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

@Injectable({ providedIn: 'root' })
export class TransaccionService {
  private _transacciones = new BehaviorSubject<Transaccion[]>([]);
  transacciones$ = this._transacciones.asObservable();
  private currentUserEmail: string | null = null;

  constructor(private storageService: StorageService, private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.currentUserEmail = user?.email || null;
      this.loadTransacciones();
    });
  }

  private getStorageKey(): string {
    return TRANSACTIONS_PREFIX + (this.currentUserEmail || 'guest');
  }

  private async loadTransacciones(): Promise<void> {
    const data = await this.storageService.get(this.getStorageKey());
    this._transacciones.next(data || []);
  }

  private async saveTransacciones(transacciones: Transaccion[]): Promise<void> {
    await this.storageService.set(this.getStorageKey(), transacciones);
    this._transacciones.next(transacciones);
  }

  async crear(transaccion: Omit<Transaccion, 'id'>): Promise<Transaccion> {
    const nueva: Transaccion = { ...transaccion, id: generateId(), monto: Number(transaccion.monto) };
    const current = this._transacciones.getValue();
    const updated = [nueva, ...current];
    await this.saveTransacciones(updated);
    return nueva;
  }

  async actualizar(transaccion: Transaccion): Promise<void> {
    const current = this._transacciones.getValue();
    const index = current.findIndex(t => t.id === transaccion.id);
    if (index !== -1) {
      current[index] = { ...transaccion, monto: Number(transaccion.monto) };
      await this.saveTransacciones([...current]);
    }
  }

  async eliminar(id: string): Promise<void> {
    const current = this._transacciones.getValue();
    const filtered = current.filter(t => t.id !== id);
    await this.saveTransacciones(filtered);
  }

  getById(id: string): Transaccion | undefined {
    return this._transacciones.getValue().find(t => t.id === id);
  }

  getTransacciones(): Transaccion[] {
    return this._transacciones.getValue();
  }
}
