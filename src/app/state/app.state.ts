import { Meal } from "../data/meal.model";

export interface MealPageState {
    mealPool: Record<string, Meal>;
    visible: ReadonlyArray<string>;
    favourites: ReadonlyArray<string>;
}
