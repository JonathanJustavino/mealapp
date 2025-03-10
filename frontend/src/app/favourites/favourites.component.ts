import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Meal } from '../../model/meal.model';
import { mealFeature } from '../../state/meals.feature';
import { CommonModule } from '@angular/common';
import { MealComponent } from '../meal/meal.component';
import { MealActions } from '../../state/meal.action';

@Component({
  selector: 'app-favourites',
  imports: [CommonModule, MealComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {

  liked$: Observable<ReadonlyArray<Meal>>

  constructor(private store: Store) {
    this.liked$ = this.store.select(mealFeature.selectLikedMeals);
  }

  ngOninit() {

  }

  onLike(mealId: string) {
    this.store.dispatch(MealActions.liked({ mealId }));
  }

  onDisLike(mealId: string) {
    this.store.dispatch(MealActions.disliked({ mealId }));
  }

}
