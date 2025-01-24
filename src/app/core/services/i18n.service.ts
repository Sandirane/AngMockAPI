import { Injectable } from '@angular/core';
import { getBrowserLang } from '@ngneat/transloco';

const LANGUAGE_STORAGE_KEY = 'preferred-lang';

@Injectable()
export class I18nService {

  readonly availableLangs: ReadonlyArray<string> = ['en', 'fr'];
  readonly lang: string;

  constructor(private window: Window) {
    const preferredLang = this.window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? getBrowserLang() ?? 'en';
    this.lang = this.availableLangs.includes(preferredLang) ? preferredLang : 'en';
    this.window.document.documentElement.lang = this.lang;
  }

  changeLanguage(lang: string) {
    this.window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    this.window.location.reload();
  }

}