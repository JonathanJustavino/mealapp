import { createSelector, createFeatureSelector } from "@ngrx/store";
// import { selectMeals } from "./meals.selectors";
import { Meal } from "../data/meal.model";
import { MealPageState } from "./app.state";
import { mealPageFeature } from "./meals.state";
import { favouritesFeatureKey } from "./favourites.state";


// export const selectFavourites = createFeatureSelector<ReadonlyArray<Meal>>('favourites');

// export const selectFavouriteState = createFeatureSelector<ReadonlyArray<string>>('favourites');

// export const selectFavouritesCollection = createSelector(
//     selectMeals,
//     selectFavouriteState,
//     (meals, collection) => {
//         return collection.map((id) => meals.find((meal) => meal.idMeal === id)!);
//     }
// );

// export const selectFavouriteState = createFeatureSelector<ReadonlyArray<string>>(favouritesFeatureKey);
// export const selectFavouriteState = createSelector(selectMealPage, (mealPageState: MealPageState) => mealPageState.favs);

// export const selectFavouriteState = createSelector(selectMealPage, (mealPageState: MealPageState) => mealPageState.favs)

// export const selectFavourites = createSelector(
//     // selectMealPool,
//     mealPageFeature.selectMealPool,
//     selectFavouriteState,
//     (pool: Record<string, Meal>, likedIds:ReadonlyArray<string>) => {
//         const favs = likedIds.map((id) => pool[id]!)
//         return favs
//     }
// );