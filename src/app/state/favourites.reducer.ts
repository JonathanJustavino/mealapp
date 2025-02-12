import { createReducer, on } from "@ngrx/store";
import { Meal } from "../data/meal.model";
import { FavouriteActions } from "./favourites.actions";
import { selectMealPool } from "./meals.selectors";


export const initialState: ReadonlyArray<string> = [];

export const favouritesReducer = createReducer(
    initialState,
    on(FavouriteActions.addFavourite, (state, {mealId}) => {
        console.log(state)
        console.log(mealId)

        return [...state, mealId]
    }),
    on(FavouriteActions.removeFavourite, (state, {mealId}) => {
        const removed = state.filter((id) => id !== mealId);
        console.log(mealId)
        console.log(removed)

        return removed
    }),
);