import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../../../shared/interfaces/car';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-car-card',
  imports: [RouterLink, TitleCasePipe, DecimalPipe],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  car = input.required<Car>()

}
