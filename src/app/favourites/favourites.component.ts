import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';
import { CommonModule } from '@angular/common';
import { bootstrapStar } from '@ng-icons/bootstrap-icons';
import { IconType, NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-favourites',
  imports: [CommonModule, MealComponent, NgIconComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  sidebarLabel: string = "Your Favourites";
  sidebarIcon: IconType = bootstrapStar;

  @Input() favouriteList: ReadonlyArray<Meal> = [];

  constructor() {}
}
