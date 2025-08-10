import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { CONSTANT } from '../constants/contant';

export interface IUser {
  id: number;
  speudo: string;
  email: string;
  profils: any;
  role: string;
}

export class updatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}

export class User {
  speudo: string;
  email: string;
  password: string;

  constructor() {
    this.speudo = '';
    this.email = '';
    this.password = '';
  }
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _http = inject(HttpClient);

  getUsers(): Observable<IUser[]> {
    return this._http
      .get<IUser[]>(environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS)
      .pipe(catchError(this.handleError));
  }

  // GET user by id
  getUserById(id: number): Observable<User> {
    return this._http
      .get<User>(
        `${environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS}/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  // POST new user
  createUser(user: User): Observable<IUser> {
    return this._http
      .post<IUser>(
        environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS,
        user
      )
      .pipe(catchError(this.handleError));
  }

  // PUT update user
  updateUserInFo(id: number, user: User): Observable<string> {
    return this._http
      .put<string>(
        `${environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS}/${id}/${
          CONSTANT.USER_RESSOURCES.UPDATE
        }`,
        user
      )
      .pipe(catchError(this.handleError));
  }

  updatePassword(id: number, passwordObj: updatePassword): Observable<string> {
    return this._http
      .put<string>(
        `${environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS}/${id}/${
          CONSTANT.USER_RESSOURCES.UPDATE_PASSWORD
        }`,
        passwordObj
      )
      .pipe(catchError(this.handleError));
  }

  // DELETE user
  deleteUser(id: number): Observable<void> {
    return this._http
      .delete<void>(
        `${environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS}/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est servenue :', error);
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }
}
