import { Component, inject } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';
import { CommonModule } from '@angular/common';
import { MealPageState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { FavouriteActions } from '../state/favourites.actions';

@Component({
  selector: 'app-random-meal',
  imports: [CommonModule, MealComponent],
  templateUrl: './random-meal.component.html',
  styleUrl: './random-meal.component.css',
  providers: [MealsService]
})
export class RandomMealComponent {

  private mealService: MealsService = inject(MealsService);
  meal!: Meal;
  thumbnail!: string;


  onAdd(mealId: string) {
    this.store.dispatch(FavouriteActions.addFavourite({ mealId }));
  }

  onRemove(mealId: string) {
    this.store.dispatch(FavouriteActions.removeFavourite({ mealId }));
  }


  ngOnInit() {
    this.mealService.getRandom().subscribe((mealData) => {
      this.meal = mealData
    });
  }

  constructor(private store: Store<MealPageState>) {

  }

}
