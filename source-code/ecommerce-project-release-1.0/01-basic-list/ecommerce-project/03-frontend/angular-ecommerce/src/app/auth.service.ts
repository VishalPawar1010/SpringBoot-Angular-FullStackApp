import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.http.post('/api/logout', {}).subscribe(
      () => {
        sessionStorage.removeItem('token');
        // sessionStorage.removeItem('user');
        this.isLoggedIn.next(false);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Logout error:', error);
      }
    );
  }

  setLogin() {
    this.isLoggedIn.next(true);
  }
}
