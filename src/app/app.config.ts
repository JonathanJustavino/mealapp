import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { bootstrapHeart, bootstrapHeartFill } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';

import { routes } from './app.routes';
import { mealPageFeature, mealPageReducer } from './state/meals.state';
import { favouritesFeature, favouritesReducer } from './state/favourites.state';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIcons({ bootstrapHeart, bootstrapHeartFill }),
    provideHttpClient(),
    //TODO: Important property must have exact same name as declared in reducer file
    provideStore(),
    // provideStore({ mealPage: mealPageReducer, favs: favouritesReducer }),
    provideState(mealPageFeature),
    provideState(favouritesFeature),
    //TODO: find out what these options fully entail
    provideStoreDevtools({ name: "Meal App", maxAge: 25, logOnly: false, trace: true })
  ]
};
