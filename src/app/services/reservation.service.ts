import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, first, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Reservation } from '../interfaces/reservartion';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

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
}
