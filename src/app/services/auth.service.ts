import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(credentials: any): Observable<any> {
    return this.http
      .post(`${environment.apiBaseUrl}/auth/login`, credentials)
      .pipe(
        map((data: any) => {
          const { accessToken } = data;
          this.storeToken(accessToken);
          return data;
        }),
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
        first()
      );
  }

  public signup(user: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/auth/signup`, user).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      }),
      first()
    );
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
  }

  public isLogged(): boolean {
    const token = this.getStoredToken();
    if (token) return this.isTokenExpired(token);
    return false;
  }

  public isAdmin(): boolean {
    const token = this.getStoredToken();
    if (token) return this.isAdminRole(token);
    return false;
  }

  public generateAuthorizationHeader(): any {
    const token: string = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return { headers: headers };
  }

  private storeToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private isTokenExpired(token: string): boolean {
    const payload = jwtDecode(token);
    const exp = (payload.exp || 0) * 1000;
    return exp > Date.now();
  }

  private isAdminRole(token: string): boolean {
    const payload: any = jwtDecode(token);
    const role: string = payload.role;
    return role === 'ROLE_ADMIN';
  }
}
