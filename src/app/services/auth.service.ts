import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(credentials: any): Observable<any> {
    return this.http
      .post(`${environment.apiBaseUrl}/auth/login`, credentials)
      .pipe(
        map((data: any) => {
          const { accessToken } = data;
          localStorage.setItem('accessToken', accessToken);
          return data;
        }),
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }

  public signup(user: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/auth/signup`, user).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
  }
}
