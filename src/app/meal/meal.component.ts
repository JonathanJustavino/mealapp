import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../data/meal.model';
import { IconType, NgIconComponent } from '@ng-icons/core';
import { bootstrapHeart, bootstrapHeartFill } from '@ng-icons/bootstrap-icons';
import { Store } from '@ngrx/store';
import { FavouriteActions } from '../state/favourites.actions';

@Component({
  selector: 'app-meal',
  imports: [
    NgIconComponent,
  ],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css',
  providers: []
})
export class MealComponent {
  readonly headingCharacterLimit = 28

  thumbnail: string | undefined;
  headingSize = "text-xl";
  liked: boolean = true;
  buttonIcon: IconType = bootstrapHeart;

  @Input() size!: Number;
  @Input() meal!: Meal;
  @Input() minimal?: boolean;
  @Output() add = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();


  toggle() {
    this.liked = !this.liked;
    if (this.liked) {
      console.log("|Meal Component| id: ", this.meal.idMeal)
      this.buttonIcon = bootstrapHeart;
      this.remove.emit(this.meal.idMeal);
      return
    }
    console.log("|Meal Component| id: ", this.meal.idMeal)
    this.buttonIcon = bootstrapHeartFill;
    this.add.emit(this.meal.idMeal);
  }

  ngOnInit() {
    if (this.minimal) {
      return
    }
    this.thumbnail = `http://localhost:3000/image/${this.meal.idMeal}`;
  }

  constructor(private store: Store) {
    this.buttonIcon = bootstrapHeart;
  }
}
