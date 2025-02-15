import {createFeature, createReducer, on} from "@ngrx/store";
import { createSelector } from "@ngrx/store";

import { MealApiActions } from "./meals.actions";
import { Meal } from "../data/meal.model";
import { MealPageState } from "./app.state";
import { FavouriteActions } from "./favourites.actions";

export const initialState: MealPageState = {
    mealPool: {},
    visible: [],
    favourites: [],
}

export const mealPageReducer = createReducer(
    initialState,
    on(MealApiActions.loadedMealPage, (state, { meals }) => {
        const newPool: Record<string, Meal> = {}
        const mealPool: Record<string, Meal> = { ...state.mealPool };
        const keepInMealPool = [...state.visible, ...state.favourites]
        const visible = meals.map((meal) => meal.idMeal!);

        for(const mealId of keepInMealPool) {
            newPool[mealId] = mealPool[mealId];
        }

        for(const meal of meals) {
            newPool[meal.idMeal!] = meal;
        }

        const next = {
            ...state,
            mealPool: newPool,
            visible,
            favourites: state.favourites
        }
        console.log("next state", next);

        return next;
    }),
    on(FavouriteActions.addFavourite, (state, {mealId}) => {
        const current_favourites = state.favourites;
        const already_contained = current_favourites.find((id) => id === mealId)

        if (already_contained) {
            return state
        }

        return {
            ...state,
            favourites: [...current_favourites, mealId],
        }
    }),
    on(FavouriteActions.removeFavourite, (state, {mealId}) => {
        const removed = state.favourites.filter((id) => id !== mealId);
        return {
            ...state,
            favourites: removed,
        }
    }),
);


export const mealPageFeatureKey = 'mealPage'
export const mealPageFeature = createFeature({
    name: mealPageFeatureKey,
    reducer: mealPageReducer,
    extraSelectors: ({ selectMealPool, selectVisible, selectFavourites }) => ({
        selectMealsForPage: createSelector(
            selectMealPool,
            selectVisible,
            selectFavourites,
            (mealPool: Record<string, Meal>, currentMeals: ReadonlyArray<string>, favourites: ReadonlyArray<string>) => {
                if (!currentMeals || !mealPool) {
                    return [];
                }
                const likedLookup = new Set(favourites);
                const currentlyDisplayedMeals = currentMeals.map((mealId) => {
                    const meal = mealPool[mealId];
                    if(likedLookup.has(mealId)) {
                        return new Meal({
                            ...meal,
                            liked: true,
                        });
                    }
                    return meal
                });
                return currentlyDisplayedMeals
            }
        ),
        selectFavouriteMeals: createSelector(
            selectMealPool,
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
