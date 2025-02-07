import { createAction, createActionGroup, props } from "@ngrx/store";
import { Meal } from "../data/meal.model";


export const MealActions = createActionGroup({
    source: 'Meals',
    events: {
        'Add Meal': props<{mealdId: string}>(),
        'Remove Meal': props<{mealdId: string}>(),
    }
});

export const MealApiActions = createActionGroup({
    source: "Meal API",
    events: {
        "Retrieved Meal List": props<{meals: ReadonlyArray<Meal>}>(),
    }
});