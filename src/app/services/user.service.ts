import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, first, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { UserFilter } from '../interfaces/filters/user-filter';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersModifiedSubject = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getListenerOfUsersData(): Observable<void> {
    return this.usersModifiedSubject.asObservable();
  }

  public notifyChangesToUsersData(): void {
    this.usersModifiedSubject.next();
  }

  public findAll(filter?: UserFilter): Observable<User[]> {
    const params = this.generateParamsToFindUsers(filter || {});
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<User[]>(`${environment.apiBaseUrl}/users`, { headers, params })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findById(uuid: string): Observable<User> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/${uuid}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findByIdForClient(uuid: string): Observable<User> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/${uuid}/client`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public create(user: User): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(`${environment.apiBaseUrl}/users`, user, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public update(uuid: string, user: User): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .put<void>(`${environment.apiBaseUrl}/users/${uuid}`, user, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public disable(uuid: string): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(
        `${environment.apiBaseUrl}/users/${uuid}/disable`,
        {},
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public enable(uuid: string): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(
        `${environment.apiBaseUrl}/users/${uuid}/enable`,
        {},
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public updateProfilePicture(uuid: string, image: string) {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .put<void>(
        `${environment.apiBaseUrl}/users/${uuid}/picture`,
        { profilePicture: image },
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public convertImageToBase64(image: File, callback: Function): void {
    if (image) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base36File = e.target.result;
        callback(base36File);
      };
      reader.readAsDataURL(image);
    }
  }

  private generateParamsToFindUsers(filter: UserFilter) {
    const params = new HttpParams()
      .set('name', filter?.name || '')
      .set('email', filter?.email || '')
      .set('cpf', filter?.cpf || '');
    return params;
  }
}
