import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
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

  // updateProject(id: number, project: Iproject): Observable<Iproject> {
  //   return this._http
  //     .put<Iproject>(
  //       `${
  //         environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS
  //       }/${id}${CONSTANT.PROJECT_RESSOURCES.CONFIGURE_PROJECT}`,
  //       project
  //     )
  //     .pipe(catchError(this.handleError));
  // }
  updateProjects(
    id: number,
    project: { level: string; githubLink: string; specification?: string },
    managerProfilId: number
  ): Observable<Iproject> {
    return this._http
      .put<Iproject>(
        `${environment.API_BASE_URL}${CONSTANT.PROJECT_RESSOURCES.PROJECTS}/${id}${CONSTANT.PROJECT_RESSOURCES.CONFIGURE_PROJECT}?managerProfilId=${managerProfilId}`,
        project
      )
      .pipe(catchError(this.handleError));
  }

  joinProjectWithProfileName(
    projectId: number,
    profilId: number,
    profilType: string
  ) {
    let params = new HttpParams()
      .set('profilId', profilId.toString())
      .set('profilType', profilType);

    return this._http.post(
      `${this._apiUrl}/${projectId}/${CONSTANT.PROJECT_RESSOURCES.JION_PROJECT_WITH_PROFILE_NAME}`,
      { params }
    );
  }

  joinProjectAsManager(
    userId: number,
    projectId: number,
    profilType: string,
    githubLink: string,
    file?: File
  ) {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('projectId', projectId.toString());
    formData.append('profilType', profilType);
    formData.append('githubLink', githubLink);

    if (file) {
      formData.append('file', file);
    }

    return this._http.post(`${this._apiUrl}/joinProjectAsManager`, formData);
  }

  // DELETE user
  deleteProject(id: number): Observable<void> {
    return this._http
      .delete<void>(`${this._apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est servenue :', error);
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }
}
