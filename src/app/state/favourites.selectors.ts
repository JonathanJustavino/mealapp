import { createSelector, createFeatureSelector } from "@ngrx/store";
// import { selectMeals } from "./meals.selectors";
import { Meal } from "../data/meal.model";
import { selectMealPage, selectMealPool } from "./meals.selectors";
import { MealPageState } from "./app.state";


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

// export const selectFavouriteState = createSelector(selectMealPage, (mealPageState: MealPageState) => mealPageState.favs)

export const selectFavourites = createSelector(
    selectMealPool,
    selectFavouriteState,
    (pool: Record<string, Meal>, likedIds:ReadonlyArray<string>) => {
        console.log("fav pool", pool)
        console.log("fav ids", likedIds)
        const favs = likedIds.map((id) => pool[id]!)
        console.log("fav meals from selector -> ", favs)
        return favs
    }
);