import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  readonly requestedRoute: string;
  readonly errorImg = "error.jpg";
  greetingMessage = computed(() => {
    return `Unfortunately ${this.requestedRoute} has not been built yet.`
  })

  constructor(private router: Router) {
    this.requestedRoute = this.router.url.slice(1);
  }
}
