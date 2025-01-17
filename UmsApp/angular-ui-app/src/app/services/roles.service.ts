import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Roles } from '../common/roles';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private baseUrl = 'http://localhost:8080/api/roles';

  constructor(private httpClient: HttpClient) {}

  getRolesList(): Observable<Roles[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.roles));
  }
}
interface GetResponse {
  _embedded: {
    roles: Roles[];
  };
}
