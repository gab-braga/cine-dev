import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(credentials: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/auth/login`, credentials);
  }

  public signup(user: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/auth/signup`, user);
  }
}
