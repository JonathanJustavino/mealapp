import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { Meal } from "../data/meal.model";
import { FavouriteActions } from "./favourites.actions";
import { mealPageFeature } from "./meals.state";
import { FavouritesState } from "./app.state";


export const initialState: FavouritesState = {
    favourites: [],
}



export const favouritesReducer = createReducer(
    initialState,
    on(FavouriteActions.addFavourite, (state, {mealId}) => {
        //Remember to return the correct state!!!
        const updatedFavourites = [...state.favourites, mealId]
        return {
            ...state,
            favourites: updatedFavourites,
        }
    }),
    on(FavouriteActions.removeFavourite, (state, {mealId}) => {
        //Remember to return the correct state!!!
        const removed = state.favourites.filter((id) => id !== mealId);
        return {
            ...state,
            favourites: removed,
        }
    }),
);


export const favouritesFeatureKey = "Favourites";
export const favouritesFeature = createFeature({
    name: favouritesFeatureKey,
    reducer: favouritesReducer,
    extraSelectors: ({selectFavourites}) => ({
        selectFavourites: createSelector(
            mealPageFeature.selectMealPool,
            selectFavourites,
            (mealPool: Record<string, Meal>, favourites: ReadonlyArray<string>) => {
                if(!mealPool || !favourites) {
                    console.log("pool or fav list are undefined");
                    return [];
                }
                const liked = favourites.map((mealId) => {
                    return mealPool[mealId]
                });

                return liked;
            }
        )
    })
});
