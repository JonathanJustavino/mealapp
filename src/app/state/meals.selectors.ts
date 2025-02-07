import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Meal } from "../data/meal.model";
// import { selectFavourites } from "./favourites.selectors";


export const selectMeals = createFeatureSelector<ReadonlyArray<Meal>>('meals');

export const selectFavouriteState = createFeatureSelector<ReadonlyArray<string>>('favourites');

export const selectFavouritesCollection = createSelector(
    selectMeals,
    selectFavouriteState,
    (meals, collection) => {
        return collection.map((id) => meals.find((meal) => meal.idMeal === id)!);
    }
);