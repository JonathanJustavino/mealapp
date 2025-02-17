import { Component, EventEmitter, Input, Output } from '@angular/core';
import { computed } from '@angular/core';
import { Meal } from '../../model/meal.model';
import { select, Store } from '@ngrx/store';
import { mealFeature } from '../../state/meals.feature';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal',
  imports: [CommonModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent {
  @Input() meal!: Meal;
  isLiked$: Observable<boolean>
  liked: boolean = false;
  likeBtnLabel$: Observable<string>;
  @Output() like = new EventEmitter<string>();
  @Output() dislike = new EventEmitter<string>();
  
  toggleLike() {
    if(this.liked) {
      this.dislike.emit(this.meal.idMeal!);
      return 
    }
    this.like.emit(this.meal.idMeal!);
  }

  constructor(private store: Store) { 
    this.isLiked$ = this.store.select(mealFeature.selectLiked).pipe(
      map((likedList) => likedList.includes(this.meal?.idMeal ?? ""))
    );
    this.likeBtnLabel$ = this.isLiked$.pipe(
      map((likedStatus) => likedStatus ? "dislike" : "like")
    );
  }

  ngOnInit() {
    //TODO: subscribing in constructor is error prone, since input data could not 
    this.isLiked$.subscribe((likedStatus) => {
      this.liked = likedStatus
    });
  }

}
