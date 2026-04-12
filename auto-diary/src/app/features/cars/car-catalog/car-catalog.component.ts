import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { RouterLink } from '@angular/router';
import { Car } from '../../../shared/interfaces/car';
import { CarCardComponent } from "../components/car-card/car-card.component";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-car-catalog',
  imports: [RouterLink, CarCardComponent],
  templateUrl: './car-catalog.component.html',
  styleUrl: './car-catalog.component.css',
})
export class CarCatalogComponent implements OnInit {
  private carService = inject(CarService);
  private authService = inject(AuthService);

  carsList = signal<Car[]>([]);
  isLoading = signal(true);

  isLoggedIn = computed(() => this.authService.isLoggedIn());

  myCars = computed(() => {
    return this.carsList().filter(car => car._ownerId === this.authService.currentUser()?._id);
  })
  otherCars = computed(() => {
    return this.carsList().filter(car => car._ownerId !== this.authService.currentUser()?._id);
  })


  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next: (cars) => {
        this.carsList.set(cars);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    })
  }

}
