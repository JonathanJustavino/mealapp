import { createReducer, on } from "@ngrx/store";
// import { FavouriteActions } from "./favourites.actions";
import { Meal } from "../data/meal.model";


export const initialState: ReadonlyArray<string> = [];

export const favouritesReducer = createReducer(
    initialState,
    // on(FavouriteActions.addFavourite, (state, { meal }) => {
    //     const favourites = state.filter((meal) => meal.idMeal !== meal.idMeal)
    //     if (favourites.length === state.length) {
    //         return state
    //     }

    //     return [...state, meal]
    // }),
    // on(FavouriteActions.removeFavourite, (state, { meal }) => {
    //     return state.filter((meal) => meal.idMeal !== meal.idMeal);
    // }),

);