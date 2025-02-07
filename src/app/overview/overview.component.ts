import { Component, inject } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { CommonModule } from '@angular/common';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';
import { FavouritesComponent } from '../favourites/favourites.component';

import { Store } from '@ngrx/store';
import { selectFavouritesCollection } from '../state/meals.selectors';
import { Observable } from 'rxjs';
import { MealApiActions } from '../state/meals.actions';
import { FavouriteActions } from '../state/favourites.actions';


@Component({
  selector: 'app-overview',
  imports: [CommonModule, MealComponent, FavouritesComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  private mealService = inject(MealsService);
  mealPage: Meal[] = [];
  currentPage: number = 1;
  limit: number = 10;
  lastPage!: number;
  favourites$: Observable<ReadonlyArray<Meal>>;

  fetchNextPage() {
    if (this.currentPage == this.lastPage) {
      return;
    }
    this.currentPage += 1;
    this.mealService.getMealPage(this.currentPage, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }

  fetchPrevPage() {
    if (this.currentPage <= 1) {
      return;
    }
    this.currentPage -= 1;
    this.mealService.getMealPage(this.currentPage, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }

  fetchFirstPage() {
    this.currentPage = 1;
    this.mealService.getMealPage(1, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }

  fetchLastPage() {
    this.currentPage = this.lastPage;
    this.mealService.getMealPage(this.lastPage, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }

  onAdd(mealId: string) {
    this.store.dispatch(FavouriteActions.addFavourite({ mealId }));
  }

  onRemove(mealId: string) {
    this.store.dispatch(FavouriteActions.removeFavourite({ mealId }));
  }

  constructor(private store: Store) {
    this.mealService.getAllMeals().subscribe((data) => {
      this.lastPage = Math.floor(data.length / this.limit);
    });
    this.mealService.getMealPage(1, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
    this.favourites$ = this.store.select(selectFavouritesCollection);
  }

  ngOnInit() {
    this.mealService.getMealPage(1, 10).subscribe((meals) => {
      this.store.dispatch(MealApiActions.retrievedMealList({meals}))
    });
  }

}
