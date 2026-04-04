import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthResponse, User, UserLogin, UserRegister } from '../../shared/interfaces/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3030/users';

  private user = signal<User | null>(null);

  isLoggedIn = computed(() => this.user() !== null);

  login(credentials: UserLogin): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((resp) => this.setSession(resp))
      )
  };

  register(credentials: UserRegister): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/register`, credentials)
      .pipe(
        tap((resp) => this.setSession(resp))
      );
  };

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.apiUrl}/logout`)
      .pipe(
        tap(() => this.clearSession())  
      );
  };

  setSession(response: AuthResponse) {
    localStorage.setItem('accessToken', response.accessToken);
    this.user.set({
      _id: response._id,
      username: response.username,
      email: response.email,
      tel: response.tel
    });
  }

  clearSession() {
    localStorage.removeItem('accessToken');
    this.user.set(null);
  }
}


