import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../../model/meal.model';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() meal!: Meal
  videoWidth: number = 320;
  videoHeight: number = 240;
  @Output() cancelDetailView = new EventEmitter<void>();


  constructor() {
  }

  dismiss() {
    console.log("Clicked outside")
    this.cancelDetailView.emit();
  }
}
