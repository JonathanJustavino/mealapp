import {createReducer, on} from "@ngrx/store";
import { createSelector } from "@ngrx/store";

import { MealApiActions } from "./meals.actions";
// import { MealActionType, ActionType } from "./meals.actions";
import { Meal } from "../data/meal.model";
import { selectMealPool, selectVisible } from "./meals.selectors";
import { MealPageState } from "./app.state";

export const initialState: MealPageState = {
    mealPool: {},
    visible: [] as string[],
    // favs: [] as string[],
}

export const mealPageReducer = createReducer(
    initialState,
    on(MealApiActions.loadedMealPage, (state, { meals }) => {

        console.log("Page loaded -> reducer computing");
        console.log("MP reducer state", state);
        // console.log("MP reducer meals", meals);

        const newTuples: [string, Meal][] = meals.map((meal) => [meal.idMeal!, meal]);
        //TODO: maybe the bug is here note and check for later
        // const contained = Array.from(state.mealPool.entries())
        // const mealPool = new Map([...state.mealPool, ...newTuples]);
        const mealPool = {...state.mealPool };
        for (const meal of meals) {
            mealPool[meal.idMeal!] = meal;
        }

        console.log("MP new map", mealPool)

        const visible = meals.map((meal) => meal.idMeal!);

        const next = {
            ...state,
            mealPool,
            visible,
        }
        console.log("next state", next);

        return next;
    })
);