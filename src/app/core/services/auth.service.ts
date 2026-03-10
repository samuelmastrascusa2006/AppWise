import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

const USER_KEY = 'moneywise_user';
const AUTH_KEY = 'moneywise_auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();
  private _ready: Promise<void>;

  constructor(private storageService: StorageService, private router: Router) {
    this._ready = this.loadUser();
  }

  get ready(): Promise<void> {
    return this._ready;
  }

  private async loadUser(): Promise<void> {
    const auth = await this.storageService.get(AUTH_KEY);
    if (auth) {
      const user = await this.storageService.get(USER_KEY);
      this._user.next(user);
      this._isAuthenticated.next(true);
    }
  }

  async register(user: User): Promise<boolean> {
    if (!user.email || !user.password) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) return false;
    if (user.password.length < 4) return false;

    // Save registered user list
    const users: User[] = (await this.storageService.get('moneywise_users')) || [];
    const exists = users.find(u => u.email === user.email);
    if (exists) return false;
    users.push(user);
    await this.storageService.set('moneywise_users', users);

    // Auto-login after register
    await this.storageService.set(USER_KEY, user);
    await this.storageService.set(AUTH_KEY, true);
    this._user.next(user);
    this._isAuthenticated.next(true);
    return true;
  }

  async login(email: string, password: string): Promise<boolean> {
    if (!email || !password) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    if (password.length < 4) return false;

    const users: User[] = (await this.storageService.get('moneywise_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return false;

    await this.storageService.set(USER_KEY, user);
    await this.storageService.set(AUTH_KEY, true);
    this._user.next(user);
    this._isAuthenticated.next(true);
    return true;
  }

  async logout(): Promise<void> {
    await this.storageService.remove(USER_KEY);
    await this.storageService.remove(AUTH_KEY);
    this._user.next(null);
    this._isAuthenticated.next(false);
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }
}
