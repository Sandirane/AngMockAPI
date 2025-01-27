import { ApplicationConfig, Injectable, isDevMode, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { I18nService } from '@core/services/i18n.service';
import { TranslocoLoader, Translation, provideTransloco } from '@ngneat/transloco';
import { authInterceptor } from '@core/interceptor/auth.interceptor';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class TranslocoModuleLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    return import(`./core/services/i18n/${lang}.json`).then(m => m.default);
  }
}

const i18nService = new I18nService(window);

export const appConfig: ApplicationConfig = {
  providers: [ 
    MessageService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideTransloco({
      config: {
        availableLangs: [...i18nService.availableLangs],
        defaultLang: i18nService.lang,
        prodMode: !isDevMode()
      },
      loader: TranslocoModuleLoader
    }),
    { provide: LOCALE_ID, useValue: i18nService.lang },
    { provide: I18nService, useValue: i18nService }]
};
