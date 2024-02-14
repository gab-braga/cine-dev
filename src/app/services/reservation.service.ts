import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subject, catchError, first, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Reservation } from '../interfaces/reservartion';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationsModifiedSubject = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getListenerOfReservationsData(): Observable<void> {
    return this.reservationsModifiedSubject.asObservable();
  }

  public notifyChangesToReservationsData(): void {
    this.reservationsModifiedSubject.next();
  }

  public findByUserId(uuid: string): Observable<Reservation[]> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Reservation[]>(
        `${environment.apiBaseUrl}/reservations/users/${uuid}`,
        {
          headers,
        }
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public create(reservation: Reservation): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(`${environment.apiBaseUrl}/reservations`, reservation, {
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

  public cancel(uuid: string): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .put<void>(
        `${environment.apiBaseUrl}/reservations/${uuid}/cancel`,
        {},
        {
          headers,
        }
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }
}
