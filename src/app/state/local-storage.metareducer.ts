import { ActionReducer, MetaReducer } from "@ngrx/store";
import { MealPageState } from "./app.state";


const STORAGE_KEY = 'appState';

export function localStorageSyncReducer(reducer: ActionReducer<MealPageState>): ActionReducer<MealPageState>{
    return (state, action) => {
        const nextState = reducer(state, action);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));

        return nextState;
    }
}

export function getInitialState(initialState: MealPageState): MealPageState {
    console.log("localll", localStorage)
    const storedState = localStorage.getItem(STORAGE_KEY);

    if(storedState) {
        try {
            const localStorageState = JSON.parse(storedState);
            const mealPageState: MealPageState = localStorageState.mealPage;

            console.log(mealPageState)

            const mealPool = mealPageState.mealPool ?? {};
            const visible = Array.isArray(mealPageState.visible) ? mealPageState.visible : [];
            const favourites = Array.isArray(mealPageState.favourites) ? mealPageState.favourites : [];

            //TODO: update ui frontend to keep track of liked unliked
            return {
                mealPool,
                visible,
                favourites
            }
        } catch(error) {
            console.error("Error parsing stored state", error);
            //TODO: may uncomment this
            // localStorage.removeItem(STORAGE_KEY);
        }
    }

    console.log("no loading, returning inital")
    return initialState;
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];
export const defaultMealPageState = { mealPool: {}, visible: [], favourites: [] }