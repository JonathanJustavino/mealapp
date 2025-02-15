import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../data/meal.model';
import { IconType, NgIconComponent } from '@ng-icons/core';
import { bootstrapHeart, bootstrapHeartFill } from '@ng-icons/bootstrap-icons';
import { Store } from '@ngrx/store';
import { FavouriteActions } from '../state/favourites.actions';
import { CommonModule } from '@angular/common';
import { mealPageFeature } from '../state/meals.state';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-meal',
  imports: [
    NgIconComponent,
    CommonModule
  ],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css',
  providers: []
})
export class MealComponent {
  readonly headingCharacterLimit = 28

  thumbnail: string | undefined;
  headingSize = "text-xl";
  liked: boolean = false;
  buttonIcon: IconType = bootstrapHeart;

  @Input() size!: Number;
  @Input() meal!: Meal;
  @Input() minimal?: boolean;
  @Output() add = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();


  toggle() {
    if (this.liked) {
      this.buttonIcon = bootstrapHeart;
      this.remove.emit(this.meal.idMeal!);
      this.liked = false;
      return
    }
    this.buttonIcon = bootstrapHeartFill;
    this.add.emit(this.meal.idMeal!);
    this.liked = true;
  }

  ngOnInit() {
    if (this.minimal) {
      return
    }
    this.thumbnail = `http://localhost:3000/image/${this.meal.idMeal}`;

    this.store.select(mealPageFeature.selectFavourites).pipe(take(1)).subscribe(favs => {
      this.liked = favs.includes(this.meal.idMeal!)
    });

    this.buttonIcon = bootstrapHeart;
    if (this.liked) {
      this.buttonIcon = bootstrapHeartFill;
    }
  }

  constructor(private store: Store) { }
}
