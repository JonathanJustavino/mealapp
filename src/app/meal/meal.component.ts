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
  liked: boolean;
  likeBtnLabel: string = "like"

  toggleLike() {
    if(this.liked) {
      this.liked = false;
      this.likeBtnLabel = "like";
      return
    }

    this.liked = true;
    this.likeBtnLabel = "dislike";
  }

  constructor() {
    this.liked = false;
  }

}
