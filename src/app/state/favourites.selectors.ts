import { createSelector, createFeatureSelector } from "@ngrx/store";


export const selectFavourites = createFeatureSelector<ReadonlyArray<string>>('favourites');