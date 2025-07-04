import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {DecodedToken} from '../../interfaces/jwt-token.model';
import {HttpClient} from '@angular/common/http';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<DecodedToken | null>(null);
  public user$ = this.userSubject.asObservable();

  public user: DecodedToken | null = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token && this.isTokenValid(token)) {
      const decoded = this.decodeToken(token);
      this.user = decoded;
      this.userSubject.next(decoded);
    }
  }

  public get userChanges() {
    return this.userSubject.asObservable();
  }

  public addUser(data: any): void {
    this.user = data;
    this.userSubject.next(data);
  }

  public removeUser(): void {
    this.user = null;
    this.userSubject.next(null);
  }

  public isLoggednIn(): boolean {
    return this.user != null;
  }

  public login(credentials: { identifier: string; password: string }) {
    return this.http.post<{ jwt: string; user: any }>(
      `${config.STRAPI}/api/auth/local`,
      credentials
    );
  }


  public loginWithToken(jwt: string): void {
    localStorage.setItem('token', jwt);
    const decoded = this.decodeToken(jwt);
    this.user = decoded;
    this.userSubject.next(decoded);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.user = null;
    this.userSubject.next(null);
    console.log('👋 Kijelentkezés megtörtént.');
  }


  public get token(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && this.isTokenValid(token);
  }

  public hasRole(role: string): boolean {
    return this.user?.role?.type === role;
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('❌ Token dekódolási hiba:', e);
      return null;
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return true;
      return decoded.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  }

  public getCurrentUser(): DecodedToken | null {
    return this.user;
  }

  requestPasswordReset(email: string) {
    return this.http.post(`${config.STRAPI}/api/auth/forgot-password`, { email });
  }

  resetPassword(code: string, password: string) {
    return this.http.post(`${config.STRAPI}/api/auth/reset-password`, {
      code,
      password,
      passwordConfirmation: password,
    });
  }


}
