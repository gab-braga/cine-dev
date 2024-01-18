import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public findByUUID(uuid: string): Observable<any> {
    return this.http
      .get(
        `${environment.apiBaseUrl}/users/${uuid}`,
        this.authService.generateAuthorizationHeader()
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }

  public findAll(): Observable<any> {
    return this.http
      .get(
        `${environment.apiBaseUrl}/users`,
        this.authService.generateAuthorizationHeader()
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }

  public create(user: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiBaseUrl}/users`,
        user,
        this.authService.generateAuthorizationHeader()
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }

  public update(uuid: string, user: any): Observable<any> {
    return this.http
      .put(
        `${environment.apiBaseUrl}/users/${uuid}`,
        user,
        this.authService.generateAuthorizationHeader()
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }

  public disable(uuid: string): Observable<any> {
    return this.http
      .post(
        `${environment.apiBaseUrl}/users/${uuid}/disable`,
        {},
        this.authService.generateAuthorizationHeader()
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }

  public enable(uuid: string): Observable<any> {
    return this.http
      .post(
        `${environment.apiBaseUrl}/users/${uuid}/enable`,
        {},
        this.authService.generateAuthorizationHeader()
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
}
