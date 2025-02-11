import { Component, inject } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { CommonModule } from '@angular/common';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';
import { FavouritesComponent } from '../favourites/favourites.component';

import { Store } from '@ngrx/store';
// import { selectMeals, selectFavouritesCollection } from '../state/meals.selectors';
import { map, Observable } from 'rxjs';
import { MealApiActions } from '../state/meals.actions';
import { selectMealPage, selectMealsForPage } from '../state/meals.selectors';
import { AppState } from '../state/app.state';
// import { selectMealsForPage } from '../state/meals.reducer';
// import { FavouriteActions } from '../state/favourites.actions';


@Component({
  selector: 'app-overview',
  imports: [CommonModule, MealComponent, FavouritesComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  private mealService = inject(MealsService);
  mealPage$: Observable<ReadonlyArray<Meal>>;
  currentPageNumber: number = 1;
  limit: number = 10;
  lastPageNumber!: number;


  fetchPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.lastPageNumber) {
      return;
    }
    this.currentPageNumber = pageNumber;
    this.mealService.getMealPage(this.currentPageNumber, this.limit).subscribe((meals) => {
      this.store.dispatch(MealApiActions.loadedMealPage({ meals }));
    });
  }

  // onAdd(meal: Meal) {
  //   this.store.dispatch(FavouriteActions.addFavourite({ meal }));
  // }

  // onRemove(meal: Meal) {
  //   this.store.dispatch(FavouriteActions.removeFavourite({ meal }));
  // }

  constructor(private store: Store<AppState>) {
    // this.mealPage$ = this.store.select(selectMealsForPage);
    //FIXME: dynamically compute last page
    this.lastPageNumber = 30;
    this.mealPage$ = this.store.select(selectMealPage).pipe(map(
      mealPageState => selectMealsForPage(mealPageState))
    );
  }

  ngOnInit() {
    this.mealPage$.subscribe((meals) => {
      console.log("meals from store", meals)
    })

    this.store.select(selectMealPage).subscribe(state => {
      console.log("current state", state)
    });

    //Initializing the store by loading first page and adding it to the state
    this.mealService.getMealPage(1, 10).subscribe((meals) => {
      this.store.dispatch(MealApiActions.loadedMealPage({ meals }))
    });
  }

}
