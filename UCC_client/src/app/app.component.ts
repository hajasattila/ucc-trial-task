import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user-services/user.service';
import { CookieServices } from './services/cookie-services/cookie.service';
import { ApiService } from './services/api.services/api.service';
import { config } from './../config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showProfileModal = false;

  constructor(
    private router: Router,
    private sApi: ApiService,
    private sUser: UserService,
    private sCooki: CookieServices
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        /*window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });*/
      }
    });
  }

  ngOnInit(): void {
    document.title = config.SITENAME;

    this.initializeUser();
    /*         this.checkOrientation();
        window.addEventListener('resize', this.checkOrientation); */
  }

  /*     ngOnDestroy(): void {
        window.removeEventListener('resize', this.checkOrientation);
    } */

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

  private cb_userLoadedFailed(err: any): void {
    this.sCooki.deleteCookie('user_token');
    this.sUser.removeUser();
    this.router.navigate(['/']);
  }

  protected closeProfileModal(): void {
    this.showProfileModal = false;
  }

  //Telefon el van-e fordítva
  /*     private checkOrientation = () => {
        const orientationMessage = document.getElementById('orientation-message');
        if (orientationMessage) {
            if (window.innerHeight > window.innerWidth) {
                orientationMessage.style.display = 'flex';
            } else {
                orientationMessage.style.display = 'none';
            }
        }
    }; */
}
