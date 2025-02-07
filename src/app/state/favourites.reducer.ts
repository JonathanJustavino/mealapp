import { createReducer, on } from "@ngrx/store";
import { FavouriteActions } from "./favourites.actions";


export const initialState: ReadonlyArray<string> = [];

export const favouritesReducer = createReducer(
    initialState,
    on(FavouriteActions.addFavourite, (state, {mealId}) => {
        if(state.indexOf(mealId) > -1) {
            return state
        }
        return [...state, mealId];
    }),
    on(FavouriteActions.removeFavourite, (state, {mealId}) => {
        return state.filter((id) => id !== mealId);
    }),
);