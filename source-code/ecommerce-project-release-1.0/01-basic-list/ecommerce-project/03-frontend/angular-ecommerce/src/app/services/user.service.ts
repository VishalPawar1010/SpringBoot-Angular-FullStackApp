import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Roles } from '../common/roles';
import { Users } from '../common/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) {}
  getUserList(): Observable<Users[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.users));
  }
  getUserById(id: number): Observable<Users> {
    return this.httpClient.get<Users>(`${this.baseUrl}/${id}`);
  }

  createUser(user: Users): Observable<Users> {
    return this.httpClient.post<Users>(this.baseUrl, user);
  }

  updateUser(id: number, user: Users): Observable<Users> {
    return this.httpClient.put<Users>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
interface GetResponse {
  _embedded: {
    users: Users[];
    _links: Roles[];
  };
}
