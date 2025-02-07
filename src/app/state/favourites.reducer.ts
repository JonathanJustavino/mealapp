import { createReducer, on } from "@ngrx/store";
import { FavouriteActions } from "./favourites.actions";


export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
    initialState,
    on(FavouriteActions.removeFavourite, (state, {mealId}) => {
        return state.filter((id) => id !== mealId)
    }),
    // on(FavouriteActions.addFavourite, (state, {mealId}) => {
    //     state.filter((id) => id )
    // })
)