import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, provideTranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      useDefaultLang: true,
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      }
    })
  ]
};
