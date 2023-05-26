import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.http.post('/api/logout', {}).subscribe(
      () => {
        sessionStorage.removeItem('token');
        // sessionStorage.removeItem('user');

        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Logout error:', error);
      }
    );
  }
}
