import { createReducer, on } from "@ngrx/store";
import { Meal } from "../data/meal.model";
import { FavouriteActions } from "./favourites.actions";
import { selectMealPool } from "./meals.selectors";


export const initialState: ReadonlyArray<string> = [];

export const favouritesReducer = createReducer(
    initialState,
    on(FavouriteActions.addFavourite, (state, {mealId}) => {
        const next = [...state, mealId]
        console.log("next post add", next)
        return next
    }),
    on(FavouriteActions.removeFavourite, (state, {mealId}) => {
        const removed = state.filter((id) => id !== mealId);
        console.log("next post removed", removed);
        return removed
    }),
);