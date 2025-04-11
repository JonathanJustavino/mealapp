import { Meal } from "../model/meal.model";

export interface MealPageFeatureState {
    mealPool: Record<number, Meal>
    visible: number[]
    liked: number[]
    isLoading: boolean
    success: boolean
    currentPage: number
}