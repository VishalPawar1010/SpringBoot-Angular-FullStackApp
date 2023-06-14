import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;


  constructor(private authService: AuthService, private router: Router,) {}

  ngOnInit(): void {
 
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  goToAddUser() {
    this.router.navigate(['add-user']);
  }

  logout() {
    this.authService.logout();
  }
  goToUsers(): void{
    this.router.navigate(['users']);
  }
}
