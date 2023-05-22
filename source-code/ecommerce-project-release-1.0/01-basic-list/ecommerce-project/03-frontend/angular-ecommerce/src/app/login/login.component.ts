import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  token: any = {};

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  login() {
    let url = '/api/login';
    this.http
      .post<any>(url, {
        email: this.model.username,
        password: this.model.password,
      })
      .subscribe((res) => {
        if (res) {
          this.token = res.token;
          sessionStorage.setItem('token', this.token);
          this.router.navigate(['users']);
          // console.log(sessionStorage.getItem('token'));
        } else {
          alert('Authentication failed.');
        }
      });
  }
}
