import {createFeature, createReducer, on} from "@ngrx/store";
import { createSelector } from "@ngrx/store";

import { MealApiActions } from "./meals.actions";
import { Meal } from "../data/meal.model";
import { MealPageState } from "./app.state";
import { FavouriteActions } from "./favourites.actions";

export const initialState: MealPageState = {
    mealPool: {} as Record<string, Meal>,
    visible: [] as string[],
    favourites: [] as string[],
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
)

export const mealPageReducer = createReducer(
    initialState,
    on(MealApiActions.loadedMealPage, (state, { meals }) => {

        const mealPool: Record<string, Meal> = { ...state.mealPool };

        console.log("currently in favs", state.favourites);

        const keep = [...state.visible, ...state.favourites]

        console.log("old pool", Object.keys(mealPool).length);

        const newPool: Record<string, Meal> = {}

        for(const mealId of keep) {
            newPool[mealId] = mealPool[mealId];
        }

        for(const meal of meals) {
            newPool[meal.idMeal!] = meal;
        }

        //TODO: keep meals that are in favourites

        console.log("new map", Object.keys(newPool).length);
        console.log("MP new map", newPool)


        const visible = meals.map((meal) => meal.idMeal!);

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


export const mealPageFeatureKey = 'mealPage'

/**
 *
 */
export const mealPageFeature = createFeature({
    name: mealPageFeatureKey,
    reducer: mealPageReducer,
    extraSelectors: ({ selectMealPool, selectVisible, selectFavourites }) => ({
        selectMealsForPage: createSelector(
            selectMealPool,
            selectVisible,
            (mealPool: Record<string, Meal>, currentMeals: ReadonlyArray<string>) => {
                if (!currentMeals || !mealPool) {
                    return [];
                }
                const currentlyDisplayedMeals = currentMeals.map((mealId) => {
                    const meal = mealPool[mealId];
                    if (!meal) {
                        console.warn(`mealID ${mealId} not in pool`)
                        return new Meal({
                            idMeal: undefined,
                            strMeal: undefined,
                        });
                    }
                    return meal
                });
                return currentlyDisplayedMeals
            }
        ),
        selectFavourites: createSelector(
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
