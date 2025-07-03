import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private langSubject = new BehaviorSubject<string>('hu');
    currentLang$ = this.langSubject.asObservable();

    constructor(private translate: TranslateService) {
        const lang = localStorage.getItem('lang') || 'hu';
        this.setLanguage(lang);
    }

    public setLanguage(lang: string): void {
        this.translate.use(lang).subscribe(() => {
            localStorage.setItem('lang', lang);
            this.langSubject.next(lang);
        });
    }
}