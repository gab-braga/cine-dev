import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, Subject, catchError, first, throwError } from 'rxjs';
import { FilmFilter } from '../interfaces/filters/film-filter';
import { Film } from '../interfaces/film';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private filmsModifiedSubject = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getListenerOfFilmsData(): Observable<void> {
    return this.filmsModifiedSubject.asObservable();
  }

  public notifyChangesToFilmsData(): void {
    this.filmsModifiedSubject.next();
  }

  public findAll(filter?: FilmFilter): Observable<Film[]> {
    const params = this.generateParamsToFindFilms(filter || {});
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Film[]>(`${environment.apiBaseUrl}/films`, { headers, params })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findForClient(): Observable<Film[]> {
    return this.http.get<Film[]>(`${environment.apiBaseUrl}/public/films`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      }),
      first()
    );
  }

  public findById(uuid: string): Observable<Film> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Film>(`${environment.apiBaseUrl}/films/${uuid}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findByIdForClient(uuid: string): Observable<Film> {
    return this.http
      .get<Film>(`${environment.apiBaseUrl}/public/films/${uuid}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public create(film: Film): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(`${environment.apiBaseUrl}/films`, film, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public update(uuid: string, film: Film): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .put<void>(`${environment.apiBaseUrl}/films/${uuid}`, film, { headers })
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

  private generateParamsToFindFilms(filter: FilmFilter) {
    const params = new HttpParams()
      .set('title', filter?.title || '')
      .set('genres', filter?.genres || '');
    return params;
  }
}
