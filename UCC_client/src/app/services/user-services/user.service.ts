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

  public user: any = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr && this.isTokenValid(token)) {
      this.user = JSON.parse(userStr);
      this.userSubject.next(this.user);
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


  public loginWithToken(jwt: string, userObj: any): void {
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userObj));
    this.user = userObj;
    this.userSubject.next(userObj);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this.userSubject.next(null);
  }


  public get token(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && this.isTokenValid(token);
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
    return this.http.post(`${config.STRAPI}/api/auth/forgot-password`, {email});
  }

  private getAuthHeaders() {
    const token = this.token;
    return {
      Authorization: `Bearer ${token}`
    };
  }


  changePassword(newPassword: string) {
    return this.http.put(
      `${config.STRAPI}/api/auth/change-password`,
      { password: newPassword },
      { headers: this.getAuthHeaders() }
    );
  }



}
