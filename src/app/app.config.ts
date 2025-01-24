import { ApplicationConfig, Injectable, isDevMode, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { I18nService } from '@core/services/i18n.service';
import { TranslocoLoader, Translation, provideTransloco } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoModuleLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    return import(`./core/services/i18n/${lang}.json`).then(m => m.default);
  }
}

const i18nService = new I18nService(window);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
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
