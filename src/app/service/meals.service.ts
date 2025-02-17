import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../../model/meal.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMeals() {}

  getMealPage(page: number, limit: number): Observable<ReadonlyArray<Meal>> {
    const mealPageSuffix = `meals?page=${page}&limit=${limit}`;
    return this.http.get<Meal[]>(`${this.baseURL}/${mealPageSuffix}`);
  }

  getRandom(): Observable<Meal> {
    const randomMealSuffix = "random";
    return this.http.get<Meal>(`${this.baseURL}/${randomMealSuffix}`);
  }

}
