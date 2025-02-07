import {createReducer, on} from "@ngrx/store";

import { MealApiActions } from "./meals.actions";
import { Meal } from "../data/meal.model";


export const initialState: ReadonlyArray<Meal> = [];

export const mealsReducer = createReducer(
    initialState,
    on(MealApiActions.retrievedMealList, (_state, { meals }) => meals)
);