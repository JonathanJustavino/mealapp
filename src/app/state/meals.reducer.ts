import {createReducer, on} from "@ngrx/store";
import { createSelector } from "@ngrx/store";

import { MealApiActions } from "./meals.actions";
// import { MealActionType, ActionType } from "./meals.actions";
import { Meal } from "../data/meal.model";
import { selectMealPool, selectVisible } from "./meals.selectors";

export interface MealPageState {
    mealPool: ReadonlyMap<string, Meal>;
    visible: string[];
}

export const initialState: MealPageState = {
    mealPool: new Map(),
    visible: [],
}

export const mealPageReducer = createReducer(
    initialState,
    on(MealApiActions.loadedMealPage, (_state, { meals }) => {
        const newTuples: [string, Meal][] = meals.map((meal) => [meal.idMeal!, meal]);
        const contained = Array.from(_state.mealPool.entries())
        const mealPool: ReadonlyMap<string, Meal> = new Map([...contained, ...newTuples]);
        const visible = meals.map((meal) => meal.idMeal!);

        return {
            ..._state,
            mealPool: mealPool,
            visible: visible
        }
    })
);