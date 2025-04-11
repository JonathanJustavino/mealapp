import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  title = "Welcome to the Meal App";
  homeImgSrc = "homepage-img.png";
}
