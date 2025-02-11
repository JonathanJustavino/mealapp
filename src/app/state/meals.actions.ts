import { createAction, createActionGroup, props } from "@ngrx/store";
import { Meal } from "../data/meal.model";
import { Action } from "@ngrx/store";


// export const MealActions = createActionGroup({
//     source: 'Meals',
//     events: {
//         'Add Meal': props<{mealdId: string}>(),
//         'Remove Meal': props<{mealdId: string}>(),
//     }
// });

export const MealApiActions = createActionGroup({
    source: "Meal API",
    events: {
        "Loaded Meal Page": props<{meals: ReadonlyArray<Meal>}>(),
        "Loaded All Meals": props<{meals: ReadonlyArray<Meal>}>(),
    }
});

// export enum ActionType {
//     LoadAllMeals = '[Meal] Load all Meals',
//     LoadMealPage = '[Meal] Load a single Meal Page',
// }

// export class LoadAllMeals implements Action {
//     readonly type = ActionType.LoadAllMeals
//     constructor(public payload: Meal[]) {}
// }

// export class LoadMealPage implements Action {
//     readonly type = ActionType.LoadMealPage
//     constructor(public payload: Meal[]) {}
// }

// export type MealActionType =
//     | LoadAllMeals
//     | LoadMealPage;
