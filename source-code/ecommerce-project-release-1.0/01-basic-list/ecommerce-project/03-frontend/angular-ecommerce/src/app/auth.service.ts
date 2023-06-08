import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  // private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.http.post('/api/logout', {}).subscribe(
      () => {
        localStorage.removeItem('token');
        // sessionStorage.removeItem('user');
        // this.isLoggedInSubject.next(false);
        this.setLoginStatus(false);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Logout error:', error);
      }
    );
  }

  setLoginStatus(isLoggedIn: boolean) {
    // this.isLoggedInSubject.next(isLoggedIn);
    this.isLoggedIn.next(isLoggedIn);
  }
}
