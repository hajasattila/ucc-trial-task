import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../../services/user-services/user.service';
import { ApiService } from '../../services/api-services/api.service';
import { LanguageService } from '../../services/language-services/language.service';
import { User } from '../../interfaces/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public currentLang: string = '';
  public currentUser: User | null = null;

  constructor(
    public translate: TranslateService,
    protected notify: ToastrService,
    private router: Router,
    private sUser: UserService,
    private languageService: LanguageService
  ) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeUrl = event.urlAfterRedirects;
      });

    this.languageService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  ngOnInit(): void {
    this.menuItems = [{ label: 'NAV.HOME', link: '/home' }];

    this.sUser.userChanges.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.currentUser = user;

      console.log('[NAVBAR] Bejelentkezett felhasználó:', user);
      if (user?.isAgent) {
        console.log('[NAVBAR] Ez egy AGENT felhasználó ✅');
      } else {
        console.log('[NAVBAR] Ez NEM agent felhasználó ❌');
      }
    });

    this.isLoggedIn = this.sUser.isLoggednIn();
    this.currentUser = this.sUser.user;

    console.log('[NAVBAR] Kezdeti user:', this.currentUser);
    if (this.currentUser?.isAgent) {
      console.log('[NAVBAR] Kezdeti állapotban AGENT ✅');
    }
  }

  protected toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  protected logout(): void {
    this.sUser.logout();
    this.router.navigate(['/login']);
  }

  protected switchLang(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.languageService.setLanguage(lang);
    this.translate.get('LANGUAGE_CHANGE_SUCCESS').subscribe((res) => {
      this.notify.success(res);
    });
  }

  protected activeUrl: string = '';
  protected menuOpen: boolean = false;
  protected menuItems: Array<{ label: string; link: string }> = [];
}
