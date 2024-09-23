
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideAuth } from 'angular-auth-oidc-client';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { AuthInterceptor } from './shared/services/auth.interceptor';

const config = environment.soeauth;

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideAuth({ config }),
    provideEnvironmentNgxMask(maskConfigFunction),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
};
