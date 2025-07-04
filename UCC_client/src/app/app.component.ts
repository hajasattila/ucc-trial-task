import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user-services/user.service';
import {CookieServices} from './services/cookie-services/cookie.service';
import {ApiService} from './services/api-services/api.service';
import {config} from '../config';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private sApi: ApiService,
    private sUser: UserService,
    private sCooki: CookieServices,
    private translate: TranslateService
  ) {

    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    document.title = config.SITENAME;
    this.initializeUser();
  }

  private initializeUser(): void {
    if (this.sCooki.getCookie('user_token')) {
      this.sApi.stayRequest().subscribe({
        next: this.cb_userLoadedSuccessfully.bind(this),
        error: this.cb_userLoadedFailed.bind(this),
      });
    }
  }

  private cb_userLoadedSuccessfully(res: any): void {
    this.sUser.addUser(res);
  }

  private cb_userLoadedFailed(): void {
    this.sCooki.deleteCookie('user_token');
    this.sUser.removeUser();
    this.router.navigate(['/']);
  }

}
