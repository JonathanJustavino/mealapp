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
  @Output() like = new EventEmitter<number>();
  @Output() dislike = new EventEmitter<number>();

  toggleLike() {
    if(this.liked) {
      this.dislike.emit(this.meal.id!);
      return
    }
    this.like.emit(this.meal.id!);
  }

  constructor(private store: Store) {
    this.isLiked$ = this.store.select(mealFeature.selectLiked).pipe(
      map((likedList) => likedList.includes(this.meal?.id ?? ""))
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
