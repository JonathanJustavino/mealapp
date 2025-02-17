import { Component, Input } from '@angular/core';
import { Meal } from '../../model/meal.model';

@Component({
  selector: 'app-meal',
  imports: [],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent {
  @Input() meal!: Meal;

  constructor() {

  }

}
