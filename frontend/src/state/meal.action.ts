import { createActionGroup, props } from "@ngrx/store";


export const MealActions = createActionGroup({
    source: "Meal",
    events: {
        'Liked': props<{mealId: number}>(),
        'Disliked': props<{mealId: number}>(),
    }
});
