import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Iproject } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/users';

  getUsers(): Observable<Iproject[]> {
    return this._http
      .get<Iproject[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // GET user by id
  getUserById(id: number): Observable<Iproject> {
    return this._http
      .get<Iproject>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // POST new user
  createUser(user: any): Observable<Iproject> {
    return this._http
      .post<Iproject>(this.apiUrl, user)
      .pipe(catchError(this.handleError));
  }

  // PUT update user
  updateUser(id: number, project: Iproject): Observable<Iproject> {
    return this._http
      .put<Iproject>(`${this.apiUrl}/${id}`, project)
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
