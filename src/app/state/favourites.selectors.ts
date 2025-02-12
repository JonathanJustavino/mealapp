import { createSelector, createFeatureSelector } from "@ngrx/store";
// import { selectMeals } from "./meals.selectors";
import { Meal } from "../data/meal.model";
import { selectMealPool } from "./meals.selectors";


// export const selectFavourites = createFeatureSelector<ReadonlyArray<Meal>>('favourites');

// export const selectFavouriteState = createFeatureSelector<ReadonlyArray<string>>('favourites');

// export const selectFavouritesCollection = createSelector(
//     selectMeals,
//     selectFavouriteState,
//     (meals, collection) => {
//         return collection.map((id) => meals.find((meal) => meal.idMeal === id)!);
//     }
// );

export const selectFavouriteState = createFeatureSelector<ReadonlyArray<string>>('favs');

export const selectFavourites = createSelector(
    selectMealPool,
    selectFavouriteState,
    (pool, likedId) => {
        return likedId.map((id) => pool[id]!)
    }
);