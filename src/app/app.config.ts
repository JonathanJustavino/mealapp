import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { mealFeature } from '../state/meals.feature';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideStore(),
    //TODO: uncomment when feature ready
    // provideState(),
    provideRouter(routes),
    provideStore({}),
    provideState(mealFeature),
    provideStoreDevtools({ name: "Meal App", maxAge: 25, logOnly: false, trace: true })
]
};
