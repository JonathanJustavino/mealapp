import { createActionGroup, props } from "@ngrx/store";

export const FavouriteActions = createActionGroup({
    source: 'Favourites',
    events: {
        'Add Favourite': props<{mealId: string}>(),
        'Remove Favourite': props<{mealId: string}>(),
    }
})


