import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Meal } from "../data/meal.model";
// import { selectFavourites } from "./favourites.selectors";
// import { MealPageState } from "./meals.reducer";
import { MealPageState } from "./app.state";


// export const selectMealPage = (state: AppState) => state.mealPageState;

//TODO: may define like this?
// export const selectMealPool = (state: AppState) =>  {
//     console.log("selected pool", state.mealPool)
//     return state.mealPool || new Map();
// }

// export const selectVisible = (state: AppState) => {
//     console.log("selecting visible", state.visible)
//     return state.visible || [];
// }


// export const selectMealPool = createSelector(
//     (state: AppState) => state.mealPageState,
//     (mealPageState) => mealPageState.mealPool
// );

// appstate {
//     feature1 {
//     }
// }

// export const selectMealPage = (state: AppState) => state.mealPage
// export const selectMealPool = (state: AppState) => state.mealPage.mealPool
// export const selectVisible = (state: AppState) => state.mealPage.visible

export const selectMealPage = createFeatureSelector<MealPageState>('mealPage');

// export const selectMealPool = (state: MealPageState) => {
//     console.log("ssssss", state)
//     return state.mealPool
// }

export const selectMealPool = createSelector(selectMealPage, (mealPageState: MealPageState) => mealPageState.mealPool);
export const selectVisible = createSelector(selectMealPage, (mealPageState: MealPageState) => mealPageState.visible);


export const selectMealsForPage = createSelector(
    selectMealPool,
    selectVisible,
    (mealPool: Record<string, Meal>, currentMeals: ReadonlyArray<string>) => {
    // (mealPool: ReadonlyMap<string, Meal>, currentMeals: ReadonlyArray<string>) => {
        console.log("selector pool", mealPool)
        console.log("current", currentMeals)
        // const currentlyDisplayedMeals: Meal[] = currentMeals.map((mealId) => mealPool.get(mealId)!);

        if (!currentMeals || !mealPool) {
            console.log("no meal or pool")
            return []
        }

        const currentlyDisplayedMeals = currentMeals.map((mealId) => {
            // const meal = mealPool.get(mealId);
            const meal = mealPool[mealId];
            if (!meal) {
                console.warn(`mealID ${mealId} not in pool`)
                return new Meal({
                    idMeal: undefined,
                    strMeal: undefined,
                })
            }
            return meal
        });

        console.log("meals after selecting", currentlyDisplayedMeals);

        return currentlyDisplayedMeals;
    }
)
