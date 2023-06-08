import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = localStorage.getItem('token');
    if (token)
      this.authService.setLoginStatus(true);
    else
      this.authService.setLoginStatus(false);
    console.log('TOKEN = ', token);
    console.log('URL = ', state.url);

    // if (state.url == '/login') {
    //   // if (token) return this.router.parseUrl('/users');
    //   return true;
    // }
    // if (!token) return this.router.parseUrl('/login');

    if (state.url === '/login' && token) {
      return this.router.parseUrl('/users');
    }

    if (!token && state.url !== '/login') {
      return this.router.parseUrl('/login');
      // return true;
    }

    return true;
  }
}
