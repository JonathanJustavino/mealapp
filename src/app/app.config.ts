import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@ng-icons/core';
import { bootstrapHeart, bootstrapHeartFill } from '@ng-icons/bootstrap-icons';


import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIcons({bootstrapHeart, bootstrapHeartFill}),
    provideHttpClient(),
    provideStore()
]
};
