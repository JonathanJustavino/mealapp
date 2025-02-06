import { Component, Input } from '@angular/core';
import { Meal } from '../data/meal';
import { MealComponent } from '../meal/meal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  imports: [CommonModule, MealComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  @Input() favouriteList: Meal[] = [];

  constructor() {
  }
}
