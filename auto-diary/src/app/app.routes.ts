import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [

    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent },
    // { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    // { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },

    // { path: 'user', component: UserComponent, canActivate: [authGuard] },
    // { path: 'cars', component: CarsComponent },
    // { path: 'cars/create', component: CarCreateComponent, canActivate: [authGuard] },
    // { path: 'cars/:id', component: CarDetailsComponent },
    // { path: 'cars/:id/edit', component: CarEditComponent, canActivate: [authGuard] },
    // { path: 'cars/:id/add-fuel', component: CarAddFuelComponent, canActivate: [authGuard] },
    // { path: 'cars/:id/add-service', component: CarAddServiceComponent, canActivate: [authGuard] },
    // { path: 'cars/:id/add-document', component: CarAddDocumentComponent, canActivate: [authGuard] },

    // { path: '**', component: NotFoundComponent }

];
