import { createActionGroup, props } from "@ngrx/store";
import { Meal } from "../data/meal.model";


export const FavouriteActions = createActionGroup({
    source: 'Favourites',
    events: {
        'Add Favourite': props<{mealId: string}>(),
        'Remove Favourite': props<{mealId: string}>(),
    }
});

export const FavouriteApiActions = createActionGroup({
    source: 'Meal API',
    events: {
        'Retrieved Meal List': props<{meals: ReadonlyArray<Meal>}>(),
    }
});