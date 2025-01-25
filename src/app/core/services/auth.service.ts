import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthResponse, User } from '@core/models/users';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private router = inject(Router)

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private getHeaders: HttpHeaders = new HttpHeaders({
    'X-Binarybox-Api-Key': this.apiKey,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string): Observable<AuthResponse> {

    const body = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/api/register`, body, { headers: this.getHeaders });

  }

  login(
    email: string,
    password: string): Observable<AuthResponse> {

    const body = { email, password };

    return this.http.post<AuthResponse>(`${this.apiUrl}/api/login`, body, { headers: this.getHeaders })
      .pipe(
        tap(
          response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.isAuthenticatedSubject.next(true);
          })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

}