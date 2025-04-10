import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { mapBackendMealToFrontend, Meal } from '../../model/meal.model';
import { HttpClient } from '@angular/common/http';
import { of, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMeals() {}

  getMealPage(page: number, limit: number): Observable<ReadonlyArray<Meal>> {
    const mealPageSuffix = `meals?page=${page}&limit=${limit}`;
    const result = this.http.get<any[]>(`${this.baseURL}/${mealPageSuffix}`);

    const frontendMeals: Observable<Meal[]> = result.pipe(
      map((meals) => meals.map(mapBackendMealToFrontend)),
      tap((converted) => console.log("conv", converted))
    );

    return frontendMeals;
  }

  getRandom(): Observable<Meal> {
    const randomMealSuffix = "random";
    return this.http.get<Meal>(`${this.baseURL}/${randomMealSuffix}`);
  }

}
