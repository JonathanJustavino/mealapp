import { Component, Input } from '@angular/core';
import { Meal } from '../data/meal';

@Component({
  selector: 'app-meal',
  imports: [],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css',
  providers: []
})
export class MealComponent {
  @Input() size!: Number;
  @Input() meal!: Meal;
  thumbnail: string | undefined;

  ngOnInit() {
    this.thumbnail = `http://localhost:3000/image/${this.meal.idMeal}`;
  }

  constructor() {

  }
}
