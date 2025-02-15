import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Meal } from '../data/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private baseUrl = 'http://localhost:3000';
  thumbNail: any;

  constructor(private http: HttpClient) {}

  getAllMeals(): Observable < Meal[] > {
    return this.http.get<Meal[]>(`${this.baseUrl}/meals`).pipe(map((meals) => meals || []));
  }

  getMealPage(page: number, limit: number): Observable < Meal[] > {
    return this.http.get<Meal[]>(`${this.baseUrl}/meals?page=${page}&limit=${limit}`);
  }

  getRandom(): Observable < Meal > {
    return this.http.get<Meal>(`${this.baseUrl}/random`);
  }
}
