import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor, errorInterceptor, tokenInterceptor } from '@conduit/shared';

import routes from './profile.routes';

/**
 * Only used when the remote runs on its own (ng serve profile). Inside the shell
 * the remote's routes run in the shell's injector, which owns HttpClient.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor, tokenInterceptor, errorInterceptor])),
  ],
};
