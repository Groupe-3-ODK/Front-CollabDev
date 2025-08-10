import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CONSTANT } from '../constants/contant';
import { Iproject } from '../interfaces/project';

export class CreateProject {
  title: string;
  description: string;
  domain: string;
  author: number;

  constructor() {
    this.title = '';
    this.description = '';
    this.domain = '';
    this.author = 0;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/users';

  getProjects(): Observable<Iproject[]> {
    return this._http
      .get<Iproject[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // GET user by id
  getProjectById(id: number): Observable<Iproject> {
    return this._http
      .get<Iproject>(
        `${
          environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS
        }/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  // POST new user
  createProject(project: CreateProject): Observable<Iproject> {
    return this._http
      .post<Iproject>(
        environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS,
        project
      )
      .pipe(catchError(this.handleError));
  }

  // PUT update user
  updateProject(id: number, project: Iproject): Observable<Iproject> {
    return this._http
      .put<Iproject>(
        `${
          environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS
        }/${id}${CONSTANT.PROJECT_RESSOURCES.CONFIGURE_PROJECT}`,
        project
      )
      .pipe(catchError(this.handleError));
  }

  // DELETE user
  deleteProject(id: number): Observable<void> {
    return this._http
      .delete<void>(
        `${
          environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS
        }/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est servenue :', error);
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }
}
