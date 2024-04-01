import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
 // this file is used for providing dependency like app.modules
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
