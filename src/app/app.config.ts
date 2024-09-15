import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { CachingInterceptor } from './caching.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withFetch(),
                      withInterceptors([loggingInterceptor]),
                    withInterceptorsFromDi()),
                    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    provideAnimationsAsync()
  ]
};
