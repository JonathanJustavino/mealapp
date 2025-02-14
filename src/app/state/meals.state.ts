import {createFeature, createReducer, on} from "@ngrx/store";
import { createSelector } from "@ngrx/store";

import { MealApiActions } from "./meals.actions";
// import { MealActionType, ActionType } from "./meals.actions";
import { Meal } from "../data/meal.model";
// import { selectMealPool, selectVisible } from "./meals.selectors";
import { MealPageState } from "./app.state";

export const initialState: MealPageState = {
    mealPool: {},
    visible: [] as string[],
    poolLimit: 50,
    favs: [] as string[],
}

export const mealPageReducer = createReducer(
    initialState,
    on(MealApiActions.loadedMealPage, (state, { meals }) => {

        const mealPool: Record<string, Meal> = { ...state.mealPool };
        // const previousPool = Object.keys(mealPool);
        // const favourites = state.favs;

        const keep = [...state.visible, ...state.favs]

        console.log("old pool", Object.keys(mealPool).length);

        const newPool: Record<string, Meal> = {}

        for(const mealId of keep) {
            newPool[mealId] = mealPool[mealId];
        }

        for(const meal of meals) {
            newPool[meal.idMeal!] = meal;
        }

        console.log("new map", Object.keys(newPool).length);
        console.log("MP new map", newPool)

        const visible = meals.map((meal) => meal.idMeal!);

        const next = {
            ...state,
            mealPool: newPool,
            visible,
            favs: state.favs
        }
        console.log("next state", next);

        return next;
    })
);


export const mealPageFeatureKey = 'mealPage'

/**
 *
 */
export const mealPageFeature = createFeature({
    name: mealPageFeatureKey,
    reducer: mealPageReducer,
    extraSelectors: ({ selectMealPool, selectVisible }) => ({
        selectMealsForPage: createSelector(
            selectMealPool,
            selectVisible,
            (mealPool: Record<string, Meal>, currentMeals: ReadonlyArray<string>) => {
                if (!currentMeals || !mealPool) {
                    return []
                }
                const currentlyDisplayedMeals = currentMeals.map((mealId) => {
                    const meal = mealPool[mealId];
                    if (!meal) {
                        console.warn(`mealID ${mealId} not in pool`)
                        return new Meal({
                            idMeal: undefined,
                            strMeal: undefined,
                        })
                    }
                    return meal
                });
                return currentlyDisplayedMeals
            }
        )
    })
})
