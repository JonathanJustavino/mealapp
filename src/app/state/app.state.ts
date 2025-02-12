import { Meal } from "../data/meal.model";
// import { MealPageState } from "./meals.reducer";

export interface MealPageState {
    //TODO: change map to record to be displayable in devtools
    mealPool: Record<string, Meal>;
    visible: ReadonlyArray<string>;
    favs: ReadonlyArray<string>;
}
