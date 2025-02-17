import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MealsComponent } from './meals/meals.component';
import { FavouritesComponent } from './favourites/favourites.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'meals', component: MealsComponent},
    {path: 'favourites', component: FavouritesComponent},
];
