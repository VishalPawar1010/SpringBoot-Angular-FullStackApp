import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  private broadcastChannel: BroadcastChannel;

  // private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    this.broadcastChannel = new BroadcastChannel('auth_channel');

    // Listen for incoming messages from other tabs
    this.broadcastChannel.addEventListener('message', (event) => {
      if (event.data === 'logout') {
        this.logout();
      }
    });
    }

  logout() {
    this.http.post('/api/logout', {}).subscribe(
      () => {
        localStorage.removeItem('token');
        // sessionStorage.removeItem('user');
        // this.isLoggedInSubject.next(false);
        this.setLoginStatus(false);

        // this.authService.setLoginStatus(false); 
        this.router.navigate(['/login']);
      
        // Notify other tabs about the logout
        this.broadcastChannel.postMessage('logout');
        window.location.reload();
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
