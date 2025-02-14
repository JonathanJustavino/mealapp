import { Meal } from "../data/meal.model";
// import { MealPageState } from "./meals.reducer";

export interface MealPageState {
    //TODO: change map to record to be displayable in devtools
    mealPool: Record<string, Meal>;
    poolLimit: number;
    visible: ReadonlyArray<string>;
    favs: ReadonlyArray<string>;
}

export interface FavouritesState {
    favourites: ReadonlyArray<string>;
}
