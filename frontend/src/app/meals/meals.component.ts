import { Component, inject } from '@angular/core';
import { MealsService } from '../service/meals.service';
import { Observable, take } from 'rxjs';
import { Meal } from '../../model/meal.model';
import { CommonModule } from '@angular/common';
import { MealComponent } from '../meal/meal.component';
import { Store } from '@ngrx/store';
import { mealPageAPI } from '../../state/meals.actions';
import { mealFeature } from '../../state/meals.feature';
import { MealActions } from '../../state/meal.action';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-meals',
  imports: [CommonModule, MealComponent, DetailsComponent],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css',
  providers: [MealsService]
})
export class MealsComponent {
  title = "Browse Meals"
  mealService = inject(MealsService);
  mealList$: Observable<ReadonlyArray<Meal>>;
  pageNumber$: Observable<number>;
  detailViewedMeal$: Observable<Meal | undefined>

  constructor(private store: Store) {
    this.mealList$ = this.store.select(mealFeature.selectMealsOnPage)
    this.pageNumber$ = this.store.select(mealFeature.selectCurrentPage);
    this.detailViewedMeal$ = this.store.select(mealFeature.selectDetailViewedMeal);
  }

  ngOnInit() {
    this.mealService.getMealPage(1, 10).subscribe((meals) => {
      this.store.dispatch(mealPageAPI.loadingPageSuccess({ meals, page: 1 }));
    });
  }

  fetchNextPage(pageNumber: number) {
    const limit = 30;
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    if (pageNumber > limit) {
      pageNumber = limit;
    }
    this.mealService.getMealPage(pageNumber, 10).subscribe((meals) => {
      this.store.dispatch(mealPageAPI.loadingPageSuccess({ meals, page: pageNumber }))
    })
  }

  onLike(mealId: number) {
    this.store.dispatch(MealActions.liked({ mealId }));
  }

  onDisLike(mealId: number) {
    this.store.dispatch(MealActions.disliked({ mealId }));
  }

  onSelect(id: number) {
    console.log(id);
    this.store.dispatch(MealActions.selected({ mealId: id }));
  }

  onCancelDetailView() {
    this.store.dispatch(MealActions.selected({ mealId: undefined }));
  }
}
