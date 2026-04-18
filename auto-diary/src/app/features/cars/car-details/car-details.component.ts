import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../shared/interfaces/car';
import { AuthService } from '../../../core/services/auth.service';
import { CarDashboardComponent } from '../components/car-dashboard/car-dashboard.component';
import { CarServiceComponent } from '../components/car-service/car-service.component';
import { CarDocumentsComponent } from '../components/car-documents/car-documents.component';
import { CarFuelComponent } from '../components/car-fuel/car-fuel.component';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-car-details',
  imports: [RouterLink, CarDashboardComponent, CarFuelComponent, CarServiceComponent, CarDocumentsComponent, DecimalPipe, TitleCasePipe],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private carService = inject(CarService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentCar = signal<Car | null>(null);
  activeTab = signal<'dashboard' | 'fuel' | 'service' | 'documents'>('dashboard');
  isLoading = signal(false);

  isOwner = computed(() => {
    return this.currentCar()?._ownerId === this.authService.currentUser()?._id
  })

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      const carId = params['id'];
      if (carId) {
        this.carService.getCarById(carId)
          .subscribe({
            next: car => this.currentCar.set(car)
          });
      }
    });
    this.activatedRoute.queryParams.subscribe(params =>{
      if(params['tab']){
        this.activeTab.set(params['tab'] as 'dashboard' | 'fuel' | 'service' | 'documents');
      }
    });
  }

  onDelete(carId: string) {
    if (this.isOwner()) {

      if (confirm('Сигурни ли сте, че искате да изтриете този автомобил?')) {
        this.isLoading.set(true);

        this.carService.deleteCar(carId).subscribe({
          next: () => {
            this.currentCar.set(null);
            this.router.navigate(['/cars']);
            this.isLoading.set(false);
          },
          error: () => this.isLoading.set(false)
        });
      }
    }
  }

  setTab(tab: 'dashboard' | 'fuel' | 'service' | 'documents') {
    this.activeTab.set(tab);
    this.router.navigate([], { queryParams: {} });
  }
}
