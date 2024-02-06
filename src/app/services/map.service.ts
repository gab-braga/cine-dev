import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, first, throwError } from 'rxjs';
import { Map } from '../interfaces/map';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public findBySessionId(uuid: string): Observable<Map> {
    const headers = this.authService.generateAuthorizationHeader();
    return this.http
      .get<Map>(`${environment.apiBaseUrl}/maps/sessions/${uuid}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }
}
