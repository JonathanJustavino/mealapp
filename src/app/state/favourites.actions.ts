import { createAction, createActionGroup, props } from "@ngrx/store";
import { Meal } from "../data/meal.model";


// export enum FavActionTypes {
//     LikeMeal = '[Fav] Like Meal',
//     DisLikeMeal = '[Fav] Dislike Meal',
// }

export const FavouriteActions = createActionGroup({
    source: 'Favourites',
    events: {
        'Add Favourite': props<{mealId: string}>(),
        'Remove Favourite': props<{mealId: string}>(),
    }
})


