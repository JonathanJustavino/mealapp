import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';
import { CommonModule } from '@angular/common';
import { bootstrapStar } from '@ng-icons/bootstrap-icons';
import { IconType, NgIconComponent } from '@ng-icons/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { mealPageFeature } from '../state/meals.state';
import { MealPageState } from '../state/app.state';

@Component({
  selector: 'app-favourites',
  imports: [CommonModule, MealComponent, NgIconComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  sidebarLabel: string = "Your Favourites";
  sidebarIcon: IconType = bootstrapStar;

  favouriteList$: Observable<ReadonlyArray<Meal>>;
  @Input() side = false;

  constructor(private store: Store<MealPageState>) {
    this.favouriteList$ = this.store.select(mealPageFeature.selectFavourites);

  }

  ngOnInit() {

  }

}
