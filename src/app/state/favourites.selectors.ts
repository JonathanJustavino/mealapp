import { createSelector, createFeatureSelector } from "@ngrx/store";
// import { selectMeals } from "./meals.selectors";
import { Meal } from "../data/meal.model";


// export const selectFavourites = createFeatureSelector<ReadonlyArray<Meal>>('favourites');

// export const selectFavouriteState = createFeatureSelector<ReadonlyArray<string>>('favourites');

// export const selectFavouritesCollection = createSelector(
//     selectMeals,
//     selectFavouriteState,
//     (meals, collection) => {
//         return collection.map((id) => meals.find((meal) => meal.idMeal === id)!);
//     }
// );