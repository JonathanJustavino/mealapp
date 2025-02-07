import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { bootstrapHeart, bootstrapHeartFill } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';

import { routes } from './app.routes';
import { mealsReducer } from './state/meals.reducer';
import { favouritesReducer } from './state/favourites.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIcons({ bootstrapHeart, bootstrapHeartFill }),
    provideHttpClient(),
    provideStore({ favourites: favouritesReducer, meals: mealsReducer }),
    //TODO: find out what these options fully entail
    provideStoreDevtools({ name: "Meal App", maxAge: 25, logOnly: false, trace: true })
  ]
};
