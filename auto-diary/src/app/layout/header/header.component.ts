import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CarAddDocumentComponent } from "../../features/cars/car-add-document/car-add-document.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CarAddDocumentComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;
  username = computed(() => this.authService.currentUser()?.username ?? '');
  logout() {
    this.authService.logout().subscribe({
      next: () => { this.router.navigate(['/home']) }
    })
  }


}
