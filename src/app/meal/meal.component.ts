import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  likeBtnLabel: string = "like";
  @Output() like = new EventEmitter<string>();
  @Output() dislike = new EventEmitter<string>();
  

  toggleLike() {
    if(this.liked) {
      this.liked = false;
      this.likeBtnLabel = "like";
      this.dislike.emit(this.meal.idMeal!);
      return
    }

    this.liked = true;
    this.likeBtnLabel = "dislike";
    this.like.emit(this.meal.idMeal!);
  }

  constructor() {
    this.liked = false;
  }

}
