import { Meal } from "../data/meal.model";
import { MealPageState } from "./meals.reducer";

export interface AppState {
    mealPageState: MealPageState;
    mealPool: ReadonlyMap<string, Meal>
}
