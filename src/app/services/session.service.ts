import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, first, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Session } from '../interfaces/session';
import { SessionFilter } from '../interfaces/filters/session-filter';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionsModifiedSubject = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getListenerOfSessionsData(): Observable<void> {
    return this.sessionsModifiedSubject.asObservable();
  }

  public notifyChangesToSessionsData(): void {
    this.sessionsModifiedSubject.next();
  }

  public findAll(filter?: SessionFilter): Observable<Session[]> {
    const params = this.generateParamsToFindSessions(filter || {});
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Session[]>(`${environment.apiBaseUrl}/sessions`, { headers, params })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findRecent(filter?: SessionFilter): Observable<Session[]> {
    const params = this.generateParamsToFindSessions(filter || {});
    return this.http
      .get<Session[]>(`${environment.apiBaseUrl}/public/sessions`, { params })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findThisWeek(): Observable<Session[]> {
    return this.http
      .get<Session[]>(`${environment.apiBaseUrl}/public/sessions/week`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findByIdForClient(uuid: string): Observable<Session> {
    return this.http
      .get<Session>(`${environment.apiBaseUrl}/public/sessions/${uuid}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findByFilmId(uuid: string): Observable<Session[]> {
    return this.http
      .get<Session[]>(`${environment.apiBaseUrl}/public/sessions/films/${uuid}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findByGenresForClient(genres: string): Observable<Session[]> {
    return this.http
      .get<Session[]>(`${environment.apiBaseUrl}/public/sessions/genres`, {
        params: { genres },
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findById(uuid: string): Observable<Session> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Session>(`${environment.apiBaseUrl}/sessions/${uuid}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public create(session: Session): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(`${environment.apiBaseUrl}/sessions`, session, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public update(uuid: string, session: Session): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .put<void>(`${environment.apiBaseUrl}/sessions/${uuid}`, session, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public close(uuid: string): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(
        `${environment.apiBaseUrl}/sessions/${uuid}/close`,
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

  public open(uuid: string): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(
        `${environment.apiBaseUrl}/sessions/${uuid}/open`,
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

  private generateParamsToFindSessions(filter: SessionFilter) {
    const params = new HttpParams()
      .set('date', filter?.date || '')
      .set('title', filter?.title || '')
      .set('number', filter?.number || '');
    return params;
  }
}
