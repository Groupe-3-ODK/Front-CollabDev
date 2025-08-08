import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';
type Tlogin = {
  email: string;
  password: string;
};

type Tuser = {
  speudo: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/users';

  login(email: string, password: string): Observable<Tlogin> {
    return this._http
      .post<Tlogin>(this.apiUrl, { email, password })
      .pipe(catchError(this.handleError));
  }

  signup(user: Tuser): Observable<Tuser> {
    return this._http
      .post<Tuser>(this.apiUrl, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est servenue :', error);
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }
}
