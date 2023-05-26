import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RequestInterceptor } from './request.interceptor';

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestInterceptor],
    });
    interceptor = TestBed.inject(RequestInterceptor);
  });

  it('should be created', () => {
    const interceptor: RequestInterceptor = TestBed.inject(RequestInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add the Authorization header when a token is present', () => {
    const token = 'example-token';
    const request = new HttpRequest('GET', '/api/data');
    const handler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.has('Authorization')).toBeTrue();
        expect(req.headers.get('Authorization')).toBe(`Bearer ${token}`);
        expect(req.url).toBe('/api/data');
        return of(new HttpResponse<any>());
      },
    };

    spyOn(sessionStorage, 'getItem').and.returnValue(token);

    interceptor.intercept(request, handler).subscribe(() => {
      expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
    });
  });

  it('should not add the Authorization header when no token is present', () => {
    const request = new HttpRequest('GET', '/api/data');
    const handler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.has('Authorization')).toBeFalse();
        expect(req.url).toBe('/api/data');
        return of(new HttpResponse<any>());
      },
    };

    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    interceptor.intercept(request, handler).subscribe(() => {
      expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
    });
  });
});
