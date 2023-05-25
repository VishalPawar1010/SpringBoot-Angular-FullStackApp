import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Users } from '../common/users';
import { usersData } from 'server/userData';
// import { USERS } from 'server/userData';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, HttpClient],
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should retrieve UserList from the API', () => {
    userService.getUserList().subscribe((users) => {
      expect(users).toEqual(usersData);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toEqual('GET');
    req.flush({ _embedded: { users: usersData } });
  });
});
