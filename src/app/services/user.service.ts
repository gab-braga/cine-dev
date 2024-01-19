import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, first, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersModifiedSubject = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getListenerUsersModified(): Observable<void> {
    return this.usersModifiedSubject.asObservable();
  }

  public notifyUsersModified(): void {
    this.usersModifiedSubject.next();
  }

  public findAll(filter?: any): Observable<any> {
    const params = this.generateParamsToFindUsers(filter);
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get(`${environment.apiBaseUrl}/users`, { headers, params })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findByUUID(uuid: string): Observable<any> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get(`${environment.apiBaseUrl}/users/${uuid}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public create(user: any): Observable<any> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post(`${environment.apiBaseUrl}/users`, user, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public update(uuid: string, user: any): Observable<any> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .put(`${environment.apiBaseUrl}/users/${uuid}`, user, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public disable(uuid: string): Observable<any> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post(`${environment.apiBaseUrl}/users/${uuid}/disable`, {}, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public enable(uuid: string): Observable<any> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post(`${environment.apiBaseUrl}/users/${uuid}/enable`, {}, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  private generateParamsToFindUsers(filter: any) {
    const params = new HttpParams()
      .set('name', filter?.name || '')
      .set('email', filter?.email || '')
      .set('cpf', filter?.cpf || '');
    return params;
  }
}
