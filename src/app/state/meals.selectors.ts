import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Meal } from "../data/meal.model";
// import { selectFavourites } from "./favourites.selectors";
import { MealPageState } from "./meals.reducer";
import { AppState } from "./app.state";


export const selectMealPage = (state: AppState) => state.mealPageState;

export const selectMealPool = (state: MealPageState) => state.mealPool;
export const selectVisible = (state: MealPageState) => state.visible;

// export const selectMealPool = createFeatureSelector<ReadonlyMap<string, Meal>>('Meal Pool');

export const selectMealsForPage = createSelector(
    selectMealPool,
    selectVisible,
    (pool: ReadonlyMap<string, Meal>, currentMeals: string[]) => {
        const currentlyDisplayedMeals: Meal[] = currentMeals.map((mealId) => pool.get(mealId)!);
        return currentlyDisplayedMeals;
    }
)
