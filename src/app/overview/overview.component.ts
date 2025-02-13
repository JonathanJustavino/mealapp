import { Component, inject } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { CommonModule } from '@angular/common';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';
import { FavouritesComponent } from '../favourites/favourites.component';

import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { MealApiActions } from '../state/meals.actions';
import { selectMealPool, selectMealsForPage, selectVisible } from '../state/meals.selectors';
import { FavouriteActions } from '../state/favourites.actions';
import { MealPageState } from '../state/app.state';


@Component({
  selector: 'app-overview',
  imports: [CommonModule, MealComponent, FavouritesComponent, CommonModule],
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

  onAdd(mealId: string) {
    this.store.dispatch(FavouriteActions.addFavourite({ mealId }));
  }

  onRemove(mealId: string) {
    this.store.dispatch(FavouriteActions.removeFavourite({ mealId }));
  }

  constructor(private store: Store<MealPageState>) {
    //FIXME: dynamically compute last page

    this.lastPageNumber = 30;
    // this.mealPage$ = this.store.select(selectMealsForPage, {page: this.currentPageNumber});

    // this.store.select(selectMealPool).subscribe((mealPool) => {
    //   console.log('pool is ', mealPool)
    // });

    // this.store.select(selectVisible).subscribe((visible) => {
    //   console.log('visibles ', visible)
    // });

    this.mealPage$ = this.store.select(selectMealsForPage);

    // this.mealPage$ = this.store.select(selectMealPage).pipe(map(
    //   mealPageState => selectMealsForPage(mealPageState))
    // );

  }

  ngOnInit() {
    // this.store.select(selectMealPage).subscribe(state => {
    //   console.log("current state", state)
    // });

    //Initializing the store by loading first page and adding it to the state
    this.mealService.getMealPage(1, 10).subscribe((meals) => {
      this.store.dispatch(MealApiActions.loadedMealPage({ meals }))
    });
  }

}
