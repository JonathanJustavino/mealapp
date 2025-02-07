import { Component, inject } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { CommonModule } from '@angular/common';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';


@Component({
  selector: 'app-overview',
  imports: [CommonModule, MealComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  private mealService = inject(MealsService);
  mealPage: Meal[] = [];
  currentPage: number = 1;
  limit: number = 10;
  lastPage!: number;

  fetchNextPage() {
    if (this.currentPage == this.lastPage) {
      return
    }
    this.currentPage += 1;
    this.mealService.getMealPage(this.currentPage, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }

  fetchPrevPage() {
    if (this.currentPage <= 1) {
      return
    }
    this.currentPage -= 1;
    this.mealService.getMealPage(this.currentPage, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }

  fetchFirstPage() {
    this.currentPage = 1;
    this.mealService.getMealPage(1, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }

  fetchLastPage() {
    this.currentPage = this.lastPage;
    this.mealService.getMealPage(this.lastPage, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }


  constructor() {
    this.mealService.getAllMeals().subscribe((data) => {
      this.lastPage = Math.floor(data.length / this.limit);
    });
    this.mealService.getMealPage(1, this.limit).subscribe((data) => {
      this.mealPage = data;
    });
  }

}
