import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { MealPageFeatureState } from "./app.state";
import { mealPageAPI } from "./meals.actions";
import { Meal } from "../model/meal.model";


export const initialState: MealPageFeatureState = {
    mealPool: {},
    visible: [],
    liked: [],
    isLoading: false,
    success: false,
    currentPage: 1
}


export const mealPageReducer = createReducer(
    initialState,
    on(mealPageAPI.loadingPageSuccess, (state, { meals }) => {
        const newPool: Record<string, Meal> = {}
        const oldPool = state.mealPool;
        const mealIdsFromLastPage = state.visible;

        mealIdsFromLastPage.forEach((mealId) => {
            newPool[mealId] = oldPool[mealId];
        });

        const visibleOnPage: string[] = [];
        meals.forEach((meal) => {
            const mealId = meal.idMeal!
            newPool[mealId] = meal;
            visibleOnPage.push(mealId)
        });

        return {
            ...state,
            mealPool: newPool,
            visible: visibleOnPage,
            success: true,
        }
    }),
);


export const mealFeatureKey = "mealFeature";

export const mealFeature = createFeature({
    name: mealFeatureKey,
    reducer: mealPageReducer,
    extraSelectors: ({selectMealPool, selectVisible, selectLiked}) => ({
        selectMealsOnPage: createSelector(
            selectMealPool,
            selectVisible,
            (mealPool: Record<string, Meal>, visible: string[]) => {
                const mealsOnPage = visible.map((mealId) => mealPool[mealId])

                return mealsOnPage
            }
        ), 
    }),
});