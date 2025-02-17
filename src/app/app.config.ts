import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { initialState, mealFeature, mealPageReducer } from '../state/meals.feature';
import { defaultmealPageFeatureState, getInitialState, metaReducers } from '../state/local-storage.metareducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideStore(),
    provideRouter(routes),
    provideStore(
      { mealFeature: mealPageReducer },
      { metaReducers, initialState: { mealFeature: getInitialState(defaultmealPageFeatureState) }}
    ),
    provideStoreDevtools({ name: "Meal App", maxAge: 25, logOnly: false, trace: true })
  ]
};
