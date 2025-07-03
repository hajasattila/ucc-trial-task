import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieServices {
  constructor(private cookieService: CookieService) {}

  // Cookie set
  public setCookie(key: string, value: string, expires?: number) {
    this.cookieService.set(key, value, expires, '/');
  }

  // Cookie get
  public getCookie(key: string): string | boolean {
    return this.cookieService.get(key) || false;
  }

  // Cookie remove
  public deleteCookie(key: string) {
    this.cookieService.delete(key, '/');
  }
}
