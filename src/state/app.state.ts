import { Meal } from "../model/meal.model";

export interface MealPageFeatureState {
    mealPool: Record<string, Meal>
    visible: string[]
    liked: string[]
    isLoading: boolean
    success: boolean
    currentPage: number
}