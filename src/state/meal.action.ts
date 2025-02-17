import { createActionGroup, props } from "@ngrx/store";


export const MealActions = createActionGroup({
    source: "Meal",
    events: {
        'Liked': props<{mealId: string}>(),
        'Disliked': props<{mealId: string}>(),
    }
});
