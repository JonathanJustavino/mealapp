import { Store } from '@ngrx/store';
import { favouritesReducer } from './state/favourites.reducer';


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    HomeComponent
],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mealapp';

  constructor() {}

}
