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

  public findBySessionId(sessionId: string): Observable<[Ticket[], Room]> {
    const headers = this.authService.generateAuthorizationHeader();
    const findTickets = this.http.get<Ticket[]>(
      `${environment.apiBaseUrl}/tickets/sessions/${sessionId}`,
      {
        headers,
      }
    );
    const findRoom = this.http.get<Room>(
      `${environment.apiBaseUrl}/rooms/sessions/${sessionId}`,
      {
        headers,
      }
    );
    return forkJoin([findTickets, findRoom]).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      }),
      first()
    );
  }
}
