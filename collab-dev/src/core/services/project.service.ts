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

<<<<<<< HEAD
  private apiUrl = environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS;
=======
  private _apiUrl =
    environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS;
>>>>>>> 00982b1558f4d7ae8cd638f872558e6c623946f6

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
<<<<<<< HEAD
      .put<Iproject>(
        `${
         this.apiUrl
        }/${id}${CONSTANT.PROJECT_RESSOURCES.CONFIGURE_PROJECT}`,
=======
      .put<IApiResponse>(
        `${this._apiUrl}/${id}${CONSTANT.PROJECT_RESSOURCES.CONFIGURE_PROJECT}`,
>>>>>>> 00982b1558f4d7ae8cd638f872558e6c623946f6
        project
      )
      .pipe(catchError(this.handleError));
  }

   joinProject(projectId:number ,profilId:number){
    return this._http.post(
      `{this.API_URL}${this.apiUrl}/${projectId}/${CONSTANT.PROJECT_RESSOURCES.JION_PROJECT_WITH_PROFILE_NAME}`,profilId
    )
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
