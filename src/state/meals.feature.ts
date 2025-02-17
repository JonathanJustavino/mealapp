import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { MealPageFeatureState } from "./app.state";
import { mealPageAPI } from "./meals.actions";
import { Meal } from "../model/meal.model";
import { MealActions } from "./meal.action";


export const initialState: MealPageFeatureState = {
    mealPool: {},
    visible: [],
    liked: [],
    isLoading: false,
    success: false,
    currentPage: 0
}


export const mealPageReducer = createReducer(
    initialState,
    on(mealPageAPI.loadingPageSuccess, (state, { meals, page }) => {
        if (page === state.currentPage) {
            return state
        }
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
            currentPage: page,
        }
    }),
    on(MealActions.liked, (state, { mealId }) => {
        const currentlyLiked = state.liked;
        if (currentlyLiked.find((id) => id === mealId)) {
            return state
        }
        
        return {
            ...state,
            liked: [...currentlyLiked, mealId]
        }
    }),
    on(MealActions.disliked, (state, { mealId }) => {
        const removed = state.liked.filter((id) => id !== mealId);
        
        return {
            ...state,
            liked: removed,
        }
    })
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