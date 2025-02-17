import { ActionReducer, MetaReducer } from "@ngrx/store";
import { mealFeature } from "./meals.feature";
import { MealPageFeatureState } from "./app.state";


const STORAGE_KEY = 'appState';

export function localStorageSyncReducer(reducer: ActionReducer<MealPageFeatureState>): ActionReducer<MealPageFeatureState> {
    return (state, action) => {
        const nextState = reducer(state, action);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));

        return nextState;
    }
}

export function getInitialState(initialState: MealPageFeatureState): MealPageFeatureState {
    console.log("Loading initial state");
    const storedState = localStorage.getItem(STORAGE_KEY);

    if(storedState) {
        try {
            const localStorageState = JSON.parse(storedState);

            const mealPageFeatureState = localStorageState.mealFeature;

            return {
                mealPool: mealPageFeatureState.mealPool ?? {},
                visible: Array.isArray(mealPageFeatureState.visible) ? mealPageFeatureState.visible : [],
                liked: Array.isArray(mealPageFeatureState.liked) ? mealPageFeatureState.liked : [],
                isLoading: false,
                success: true,
                currentPage: mealPageFeatureState.currentPage,
            }


        } catch(error) {
            console.error("Error on hydrating state", error);
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    console.warn("Could not rehydrate state, using fresh state")
    return initialState
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer]
export const defaultmealPageFeatureState = {mealPool: {}, visible: [], liked: [], isLoading: false, success: true, currentPage: 0}