import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarRoutes } from '../model/navbar-routes.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gogogo';
  availableRoutes: NavbarRoutes[] = [
    {name: "home", href: "/"},
    {name: "meals", href: "/meals"},
    {name: "favourites", href: "/favourites"}
  ];
}
