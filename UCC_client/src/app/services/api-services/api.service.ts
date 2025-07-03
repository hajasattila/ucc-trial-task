import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { config } from '../../../config';
import { CookieServices } from '../cookie-services/cookie.service';
import { Router } from '@angular/router';
import { UserService } from '../user-services/user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient, private notify: ToastrService, private sCookie: CookieServices, private route: Router, private sUser: UserService) {}

    public login(data: any) {
        return this.http.post<{ jwt: string; user: any }>(config.STRAPI + '/api/auth/local', data).subscribe({
            next: (response) => {
                this.sUser.addUser(response.user);
                this.sCookie.setCookie('user_token', response.jwt, 365);
                this.route.navigate(['/home']);
                this.notify.success('Login Successful');
            },
            error: (err) => {
                this.notify.error('Login Failed');
            },
        });
    }

    public logout() {
        this.sCookie.deleteCookie('user_token');
        this.sUser.removeUser();
        this.route.navigate(['/home']);
    }

    public stayRequest(): Observable<any> {
        return this.http.get(config.STRAPI + '/api/users/me').pipe();
    }

    //!POST
    public PostRequest(url: string, data: any) {
        return this.http.post(config.STRAPI + '/api' + url, data).pipe();
    }
    //!PUT
    public PutRequest(url: string, data: any) {
        return this.http.put(config.STRAPI + '/api' + url, data).pipe();
    }
    //!GET
    public GetRequest(url: string) {
        return this.http.get(config.STRAPI + '/api' + url).pipe();
    }
    //!DEL
    public DelRequest(url: string) {
        return this.http.delete(config.STRAPI + '/api' + url).pipe();
    }

    //! ERROR
    public error(err: any) {
        if (err.error && err.error.error) {
            return err.error.error.message;
        } else {
            this.notify.warning('Ismeretlen hiba lépet fell próbáld újra később!');
            console.log(err);
        }
    }
}
