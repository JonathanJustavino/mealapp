import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { RandomMealComponent } from './random-meal/random-meal.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
    {path: 'meals', component: OverviewComponent},
    {path: 'random', component: RandomMealComponent},
    {path: 'home', component: HomeComponent},
    {path: 'favourites', component: FavouritesComponent},
    {path: '', component: HomeComponent},
    {path: '**', component: ErrorComponent},
];
