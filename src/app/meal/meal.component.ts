import { Component, Input } from '@angular/core';
import { Meal } from '../data/meal.model';
import { IconType, NgIconComponent } from '@ng-icons/core';
import { bootstrapHeart, bootstrapHeartFill } from '@ng-icons/bootstrap-icons';

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


  toggle() {
    this.liked = !this.liked;
    this.buttonIcon = !this.liked ? bootstrapHeartFill : bootstrapHeart;
  }

  ngOnInit() {
    if (this.minimal) {
      return
    }
    this.thumbnail = `http://localhost:3000/image/${this.meal.idMeal}`;
  }

  constructor() {
    this.buttonIcon = bootstrapHeart;
  }
}
