import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/users';

  getUsers(): Observable<User[]> {
    return this._http
      .get<User[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // GET user by id
  getUserById(id: number): Observable<User> {
    return this._http
      .get<User>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // POST new user
  createUser(user: User): Observable<User> {
    return this._http
      .post<User>(this.apiUrl, user)
      .pipe(catchError(this.handleError));
  }

  // PUT update user
  updateUser(id: number, user: User): Observable<User> {
    return this._http
      .put<User>(`${this.apiUrl}/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  // DELETE user
  deleteUser(id: number): Observable<void> {
    return this._http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est servenue :', error);
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }
}
