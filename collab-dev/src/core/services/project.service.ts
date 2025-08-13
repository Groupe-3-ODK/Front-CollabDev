import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CONSTANT } from '../constants/contant';
import { IApiResponse } from '../interfaces/api-response';
import { Iproject } from '../interfaces/project';

export class CreateProject {
  title: string;
  description: string;
  domain: string;
  author: { id: number };

  constructor() {
    this.title = '';
    this.description = '';
    this.domain = '';
    this.author = { id: 0 };
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _http = inject(HttpClient);

  private _apiUrl =
    environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS;

  getProjects(): Observable<IApiResponse> {
    return this._http
      .get<IApiResponse>(this._apiUrl)
      .pipe(catchError(this.handleError));
  }

  // GET user by id
  getProjectById(id: number): Observable<IApiResponse> {
    return this._http
      .get<IApiResponse>(`${this._apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // POST new user
  createProject(project: CreateProject): Observable<IApiResponse> {
    return this._http
      .post<IApiResponse>(this._apiUrl, project)
      .pipe(catchError(this.handleError));
  }

  // PUT update user
  updateProject(id: number, project: Iproject): Observable<IApiResponse> {
    return this._http
      .put<IApiResponse>(
        `${this._apiUrl}/${id}${CONSTANT.PROJECT_RESSOURCES.CONFIGURE_PROJECT}`,
        project
      )
      .pipe(catchError(this.handleError));
  }

  // DELETE user
  deleteProject(id: number): Observable<void> {
    return this._http
      .delete<void>(`${this._apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getProjectRecommendations(projectId: number): Observable<IApiResponse> {
  const baseUrl = environment.API_BASE_URL.endsWith('/')
    ? environment.API_BASE_URL.slice(0, -1)
    : environment.API_BASE_URL;

  const url = `${baseUrl}/systems/projectRecommendation?projectId=${projectId}`;
  return this._http
    .get<IApiResponse>(url)
    .pipe(catchError(this.handleError));
}

getPendingContributors(projectId: number): Observable<IApiResponse> {
  const baseUrl = environment.API_BASE_URL.endsWith('/')
    ? environment.API_BASE_URL.slice(0, -1)
    : environment.API_BASE_URL;

  const url = `${baseUrl}/projects/${projectId}/contributors/pending`;
  return this._http.get<IApiResponse>(url).pipe(catchError(this.handleError));
}

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est servenue :', error);
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }
}
