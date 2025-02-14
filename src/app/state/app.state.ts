import { Meal } from "../data/meal.model";

export interface MealPageState {
    //TODO: change map to record to be displayable in devtools
    mealPool: Record<string, Meal>;
    visible: ReadonlyArray<string>;
    favourites: ReadonlyArray<string>;
}
