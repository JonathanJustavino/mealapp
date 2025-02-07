import { Component, inject } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random-meal',
  imports: [CommonModule, MealComponent],
  templateUrl: './random-meal.component.html',
  styleUrl: './random-meal.component.css',
  providers: [MealsService]
})
export class RandomMealComponent {

  private mealService: MealsService = inject(MealsService);
  meal!: Meal;
  thumbnail!: string;

  ngOnInit() {
    this.mealService.getRandom().subscribe((mealData) => {
      this.meal = mealData
    });
  }

}
