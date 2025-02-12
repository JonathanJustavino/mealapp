import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from '../data/meal.model';
import { MealComponent } from '../meal/meal.component';
import { CommonModule } from '@angular/common';
import { bootstrapStar } from '@ng-icons/bootstrap-icons';
import { IconType, NgIconComponent } from '@ng-icons/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFavourites } from '../state/favourites.selectors';

@Component({
  selector: 'app-favourites',
  imports: [CommonModule, MealComponent, NgIconComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  sidebarLabel: string = "Your Favourites";
  sidebarIcon: IconType = bootstrapStar;

  // favouriteList: Observable<ReadonlyArray<Meal>>;
  favouriteList: Meal[];
  @Input() side = false;

  constructor(private store: Store) {
    this.favouriteList = [];
    // this.favouriteList = this.store.select(selectFavourites);
  }

  ngOnInit() {
    // this.favouriteList$ = this.store.select(selectFavourites);
  }

}
