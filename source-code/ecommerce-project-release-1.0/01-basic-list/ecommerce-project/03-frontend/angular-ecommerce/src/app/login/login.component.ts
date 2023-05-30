import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  token: any = {};
  loginError = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    let url = '/api/login';
    this.http
      .post<any>(url, {
        email: this.model.username,
        password: this.model.password,
      })
      .subscribe({
        next: (res) => {
          this.token = res.token;
          sessionStorage.setItem('token', this.token);
          this.authService.setLogin();
          this.router.navigate(['users']);
        },
        error: (err) => {
          this.loginError = 'Invalid user email or password'; // Set the loginError property
          console.log('ERROR = ', err);
        },
      });
  }
}
