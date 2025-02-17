import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Meal } from "../model/meal.model";


export const mealPageAPI = createActionGroup({
    source: "Meal Page API",
    events: {
        'Loading Page': emptyProps(),
        'Loading Page Success': props<{meals: ReadonlyArray<Meal>, page: number}>(),
        'Loading Page Failure': props<{meals: ReadonlyArray<Meal>}>(),
    }
});