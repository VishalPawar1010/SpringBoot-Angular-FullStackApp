import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    // Make a request to the backend to invalidate the JWT token
    this.http.post('/api/logout', {}).subscribe(
      () => {
        // Clear any saved token or user information from local storage or session storage
        sessionStorage.removeItem('token');
        // sessionStorage.removeItem('user');

        // Redirect the user to the login page or any other desired page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Logout error:', error);
      }
    );
  }
}
