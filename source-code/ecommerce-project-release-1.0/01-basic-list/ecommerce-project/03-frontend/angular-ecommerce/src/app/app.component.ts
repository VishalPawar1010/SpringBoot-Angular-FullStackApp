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
    // const token = localStorage.getItem('token');
    // if (token) {
    //   console.log("TOKEN HAI");
      
    //   this.authService.setLoginStatus(true);
    // }
    // else {
    //   console.log("TOKEN NAHI HAI");
    //   this.authService.setLoginStatus(false);
    // }

    // this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
    //   console.log('IS LOGGED IN SUBJECT = ', isLoggedIn);

    //   this.isLoggedIn = isLoggedIn;
    // });
 
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {

      console.log('IS LOGGED IN SUBJECT = ', isLoggedIn);

      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }
  goToUsers(): void{
    this.router.navigate(['users']);
  }
}
