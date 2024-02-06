import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subject, catchError, first, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Room } from '../interfaces/room';
import { environment } from '../../environments/environment';
import { RoomFilter } from '../interfaces/filters/room-filter';
import { Map } from '../interfaces/map';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private roomsModifiedSubject = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getListenerOfRoomsData(): Observable<void> {
    return this.roomsModifiedSubject.asObservable();
  }

  public notifyChangesToRoomsData(): void {
    this.roomsModifiedSubject.next();
  }

  public findAll(filter?: RoomFilter): Observable<Room[]> {
    const params = this.generateParamsToFindRooms(filter || {});
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Room[]>(`${environment.apiBaseUrl}/rooms`, { headers, params })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public findById(uuid: string): Observable<Room> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Room>(`${environment.apiBaseUrl}/rooms/${uuid}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public create(room: Room): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .post<void>(`${environment.apiBaseUrl}/rooms`, room, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public updateDetails(uuid: string, room: Room): Observable<void> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .put<void>(`${environment.apiBaseUrl}/rooms/${uuid}`, room, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public updateSeatMap(uuid: string, room: any) {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .put<void>(`${environment.apiBaseUrl}/rooms/${uuid}/maps`, room, {
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

  public findSeatsByRoomId(uuid: string): Observable<any> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<void>(`${environment.apiBaseUrl}/seats/room/${uuid}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  private generateParamsToFindRooms(filter: RoomFilter) {
    const params = new HttpParams().set('number', filter?.number || '');
    return params;
  }
}
