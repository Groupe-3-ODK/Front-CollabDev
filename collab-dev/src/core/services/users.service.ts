import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { CONSTANT } from '../constants/contant';
import { IApiResponse } from '../interfaces/api-response';
import { PopUp } from '../../shared/reusablesComponents/pop-up/pop-up';

export interface IUser {
  id: number;
  speudo: string;
  email: string;
  profils: any;
  role: string;
}
export enum ProfilType {
    DEVELOPER,
    DESIGNER,
    MANAGER
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

  getUsers(): Observable<IApiResponse> {
    return this._http
      .get<IApiResponse>(
        environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS
      )
      .pipe(catchError(this.handleError));
  }

  // GET user by id
  getUserById(id: number): Observable<IApiResponse> {
    return this._http
      .get<IApiResponse>(
        `${environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS}/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  // POST new user
  createUser(user: User): Observable<IApiResponse> {
    return this._http
      .post<IApiResponse>(
        environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS,
        user
      )
      .pipe(catchError(this.handleError));
  }

  // PUT update user
  updateUserInFo(id: number, user: User): Observable<IApiResponse> {
    return this._http
      .put<IApiResponse>(
        `${environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS}/${id}/${
          CONSTANT.USER_RESSOURCES.UPDATE
        }`,
        user
      )
      .pipe(catchError(this.handleError));
  }
  /*joinProject(projectId: number, profileId: number) {
    return this.httpClient.post(
      `${this.API_URL}${this.ENDPOINT_JOIN_PROJECT}/${projectId}/join`,
      profileId
    );
  }*/

  //Joindre un projet par profile
  joinProjectWithProfilType(projectId: number , userId: number ,profilType : ProfilType ) :Observable<string>{
      let params = new  HttpParams()
      .append("projectId", projectId)
      .append("userId", userId)
      .append("profilType", profilType);
      return this._http.post<string>(
        `${environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.JION_PROJECT_WITH_PROFILE_NAME}`, {params}
      ).pipe(catchError(this.handleError));
  }

  updatePassword(
    id: number,
    passwordObj: updatePassword
  ): Observable<IApiResponse> {
    return this._http
      .put<IApiResponse>(
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
