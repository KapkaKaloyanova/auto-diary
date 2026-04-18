import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CarService } from '../../core/services/car.service';
import { Car } from '../../shared/interfaces/car';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private carService = inject(CarService);

  isLoggedIn = this.authService.isLoggedIn;

  cars = signal<Car[]>([]);
  currentUser = this.authService.currentUser;
  activeShortcut = signal<string | null>(null);

  ngOnInit(): void {
    if (this.isLoggedIn()) {

      this.carService.getCarsByOwner(this.currentUser()!._id).subscribe({
        next: (cars) => this.cars.set(cars),
        error: (err) => console.log(err),
      });
    }
  }

toggleShortcut(type:string){
  this.activeShortcut.update((current) => (current === type ? null : type));
}

closeShortcut() {
  this.activeShortcut.set(null);
}


}
