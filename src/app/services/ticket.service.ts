import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, first, forkJoin, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ticket } from '../interfaces/ticket';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public findBySessionId(uuid: string): Observable<Ticket[]> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Ticket[]>(`${environment.apiBaseUrl}/tickets/sessions/${uuid}`, {
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

  public findByReservationId(uuid: string): Observable<Ticket[]> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Ticket[]>(`${environment.apiBaseUrl}/tickets/reservations/${uuid}`, {
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
