import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const meal = createActionGroup({
    source: "Meal",
    events: {
        'Liked': props<{mealId: string}>,
        'Disliked': props<{mealId: string}>,
    }
});
