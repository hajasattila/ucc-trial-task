import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieServices } from '../../services/cookie-services/cookie.service';
@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService {
    constructor(private cookie: CookieServices) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.cookie.getCookie('user_token');
        if (token) {
            const hijackedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            return next.handle(hijackedRequest);
        } else {
            return next.handle(req);
        }
    }
}
