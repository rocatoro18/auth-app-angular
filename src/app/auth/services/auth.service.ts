import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // PROPIEDADES COMPUTADAS AL EXTERIOR
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() { }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token',token);
    return true;
  }

  login(email: string, password: string): Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({user, token}) => this.setAuthentication(user, token)),
        //catchError(err => {
        //  console.log(err);
        //  return throwError(() => 'Algo no sucedió como lo esperaba');
          //return of(false);
        //})
        catchError(err => throwError(() => err.error.message))

        // TODO: ERRORES
      );

  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if(!token) return of(false);

    // CON ESTO SE CREAN LOS HEADERS
    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url,{headers})
      .pipe(
        map(({user, token}) => this.setAuthentication(user, token)),
        // Error
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);

        })
      )
  }

}
