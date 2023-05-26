import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticateGuard } from './authenticate.guard';

describe('AuthenticateGuard', () => {
  let guard: AuthenticateGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthenticateGuard],
    });
    guard = TestBed.inject(AuthenticateGuard);
    router = TestBed.inject(Router);
  });

  it('should allow access to /login when there is no token', () => {
    spyOn(router, 'parseUrl'); // Spy on the router parseUrl method

    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot: RouterStateSnapshot = {
      url: '/login',
    } as RouterStateSnapshot;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBeTrue();
    expect(router.parseUrl).not.toHaveBeenCalled();
  });

  it('should allow access to /users when there is a token and the current URL is /login', () => {
    spyOn(router, 'parseUrl').and.callThrough(); // Spy on the router parseUrl method

    sessionStorage.setItem('token', 'example-token');

    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot: RouterStateSnapshot = {
      url: '/login',
    } as RouterStateSnapshot;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toEqual(router.parseUrl('/users'));
    expect(router.parseUrl).toHaveBeenCalledWith('/users');

    sessionStorage.removeItem('token'); // Clean up the token from sessionStorage
  });

  it('should redirect to /login when there is no token and the current URL is not /login', () => {
    spyOn(router, 'parseUrl').and.callThrough(); // Spy on the router parseUrl method

    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot: RouterStateSnapshot = {
      url: '/some-url',
    } as RouterStateSnapshot;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toEqual(router.parseUrl('/login'));
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('should allow access to other URLs when there is a token', () => {
    spyOn(router, 'parseUrl'); // Spy on the router parseUrl method

    sessionStorage.setItem('token', 'example-token');

    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot: RouterStateSnapshot = {
      url: '/some-url',
    } as RouterStateSnapshot;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBeTrue();
    expect(router.parseUrl).not.toHaveBeenCalled();

    sessionStorage.removeItem('token'); // Clean up the token from sessionStorage
  });
});
