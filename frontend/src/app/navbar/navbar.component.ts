import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarRoutes } from '../../model/navbar-routes.model';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() routes?: NavbarRoutes[];

  ngOnInit() {
    if(!this.routes) {
      this.routes = [{name: "something went wrong...", href: "/"}]
    } 
  } 


  constructor() {
  }
}
