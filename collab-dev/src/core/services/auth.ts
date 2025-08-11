import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CONSTANT } from '../constants/contant';
import { IUser, User } from './users.service';
export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _http = inject(HttpClient);

  login(login: Login): Observable<IUser> {
    return this._http
      .post<IUser>(
        environment.API_BASE_URL +
          CONSTANT.USER_RESSOURCES.USERS +
          CONSTANT.USER_RESSOURCES.LOGIN,
        login
      )
      .pipe(catchError(this.handleError));
  }

  signup(user: User): Observable<IUser> {
    return this._http
      .post<IUser>(
        environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS,
        user
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est servenue :', error);
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }
}
