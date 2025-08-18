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

import { TaskStatus } from '../../app/shared/models/task-status.enum';

@Injectable({
  providedIn: 'root',
})
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

export class ManagerInfo {
  userId: number;
  projectId: number;
  profilType: string;
  githubLink: string;
  file?: File;

  constructor() {
    this.userId = 0;
    this.projectId = 0;
    this.profilType = '';
    this.githubLink = '';
    this.file = undefined;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _http = inject(HttpClient);

  private _apiUrl =
    environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS;

  private apiUserUrl =
    environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS;

  private apiUrl = environment.API_BASE_URL;

  getProjects(): Observable<IApiResponse> {
    return this._http
      .get<IApiResponse>(this._apiUrl)
      .pipe(catchError(this.handleError));
  }

  getUserContributions(userId: number): Observable<IApiResponse> {
    let url = `${this.apiUrl}projects/${userId}/projectsUserAll`;
    return this._http.get<IApiResponse>(url);
  }

  getProjectByStatus(status: string): Observable<IApiResponse> {
    let url = `${this.apiUrl}projects/getByStatus?status=${status}`;
    return this._http.get<IApiResponse>(url);
  }
  // GET user by id
  getProjectById(id: number): Observable<IApiResponse> {
    return this._http
      .get<IApiResponse>(`${this._apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getProjectDetails(projectId: number): Observable<IApiResponse> {
  return this._http.get<IApiResponse>(
    `${this.apiUrl}projects/${projectId}`
  );
}

  selectProfilAndAddToProject(profileId: number, projectId: number): Observable<any> {
  return this._http.put(
    `${this.apiUrl}managerInfo/selectProfilAndAddToProject`,
    null,
    { params: { profilId: profileId.toString(), projectId: projectId.toString() } }
  );
}

  getProjectRecommendations(projectId: number): Observable<IApiResponse> {
  return this._http.get<IApiResponse>(
    `${this.apiUrl}systems/projectRecommendation`,
    { params: { projectId: projectId.toString() } }
  );
}

  validateProject(managerId: number, projectId: number): Observable<string> {
    const params = new HttpParams()
      .set('managerId', managerId.toString())
      .set('projectId', projectId.toString());

    return this._http.put<string>(
      `${this.apiUrl}/managerInfo/validateProject`,
      { params }
    );
  }

  getPendingProjectsByUser(userId: number) {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;
    return this._http.get<any>(`${baseUrl}/projects/${userId}/userAllpendingProjects`);
  }

  cancelPendingRequest(projectId: number, userId: number) {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;
    return this._http.delete<any>(`${baseUrl}/projects/${projectId}/removeUsertoPending/${userId}`);
  }

  // Validation projet
  // this.myService.validateProject(5, 123).subscribe({
  //   next: res => console.log(res),  // "Projet Terminé :) 🥳"
  //   error: err => console.error(err)
  // });

  // POST new user
  createProject(project: CreateProject): Observable<IApiResponse> {
    return this._http
      .post<IApiResponse>(this._apiUrl, project)
      .pipe(catchError(this.handleError));
  }

  // PUT update user

  updateProjects(
    id: number,
    project: { level: string; githubLink: string },
    managerProfilId?: number,
    file?: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('level', project.level);
    formData.append('githubLink', project.githubLink);

    if (file) {
      formData.append('file', file, file.name);
    }

    return this._http
      .put<any>(
        `${environment.API_BASE_URL}${CONSTANT.PROJECT_RESSOURCES.PROJECTS}/${id}${CONSTANT.PROJECT_RESSOURCES.CONFIGURE_PROJECT}`,
        formData,
        {
          params:
            managerProfilId !== undefined
              ? new HttpParams().set(
                  'managerProfilId',
                  managerProfilId.toString()
                )
              : new HttpParams(),
        }
      )
      .pipe(catchError(this.handleError));
  }

  updateTaskStatus(taskId: number, newStatus: TaskStatus): Observable<any> {
    const url = `${this.apiUrl}/tasks/${taskId}/status`;
    const body = { status: newStatus };
    return this._http.patch(url, body);
  }

  joinProjectWithProfilName(
    projectId: number,
    userId: number,
    profilType: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('projectId', projectId.toString())
      .set('userId', userId.toString())
      .set('profilType', profilType);

    return this._http.post(
      `${this.apiUserUrl}/joinProjectWithProfilName`,
      null, // pas de body
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

    // const request = {
    //   userId: 5,
    //   projectId: 12,
    //   profilType: 'MANAGER'
    // };

    // const githubLink = 'https://github.com/monrepo/projet';

    // const fileInput = this.fileInput.nativeElement; // exemple avec un input file
    // const file = fileInput.files.length > 0 ? fileInput.files[0] : undefined;

    // this.myService.joinProjectAsManager(request, githubLink, file).subscribe({
    //   next: res => console.log('Rejoint projet en manager', res),
    //   error: err => console.error('Erreur join project manager', err)
    // });

    if (file) {
      formData.append('file', file);
    }

    return this._http.post(`${this.apiUserUrl}/joinProjectAsManager`, formData);
  }

  // DELETE user
  deleteProject(id: number): Observable<void> {
    return this._http
      .delete<void>(`${this._apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // getProjectRecommendations(projectId: number): Observable<IApiResponse> {
  //   const baseUrl = environment.API_BASE_URL.endsWith('/')
  //     ? environment.API_BASE_URL.slice(0, -1)
  //     : environment.API_BASE_URL;

  //   const url = `${baseUrl}/systems/projectRecommendation?projectId=${projectId}`;
  //   return this._http.get<IApiResponse>(url).pipe(catchError(this.handleError));
  // }

  getProjectsByUserAsDesigner(userId: number): Observable<IApiResponse> {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;

    const url = `${baseUrl}/projects/${userId}/projectsUserDesigner`;
    return this._http.get<IApiResponse>(url).pipe(catchError(this.handleError));
  }

  getProjectsByUserAsDevelopper(userId: number): Observable<IApiResponse> {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;

    const url = `${baseUrl}/projects/${userId}/projectsUserDesigner`;
    return this._http.get<IApiResponse>(url).pipe(catchError(this.handleError));
  }

  getProjectsByUserAsManager(userId: number): Observable<IApiResponse> {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;

    const url = `${baseUrl}/projects/${userId}/projectsUserManager`;
    return this._http.get<IApiResponse>(url).pipe(catchError(this.handleError));
  }
  getAllProjectsByUser(userId: number): Observable<IApiResponse> {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;

    const url = `${baseUrl}/projects/${userId}/projectsUserAll`;
    return this._http.get<IApiResponse>(url).pipe(catchError(this.handleError));
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

  // selectProfilAndAddToProject(
  //   profileId: number,
  //   projectId: number
  // ): Observable<any> {
  //   const params = new HttpParams()
  //     .set('profilId', profileId.toString())
  //     .set('projectId', projectId.toString());

  //   return this._http.put<any>(
  //     `${this.apiUrl}/managerInfo/selectProfilAndAddToProject`,
  //     {}, // corps vide
  //     { params }
  //   );
  // }

  // this.myService.selectProfilAndAddToProject(12, 45).subscribe({
  //   next: response => console.log('Profil ajouté en attente', response),
  //   error: err => console.error('Erreur ajout profil', err)
  // });

  //--------------------------------------

  // makeComment(projectId: number, userId: number, comment: any): Observable<any> {
  //   return this.http.put(
  //     `${this._apiUrl}/${projectId}/${userId}/makeComment`,
  //     comment
  //   );
  // }

  // const comment = {
  //   text: "Super projet !",
  //   // autres champs selon CommentDto
  // };

  // this.myService.makeComment(12, 5, comment).subscribe({
  //   next: res => console.log('Commentaire ajouté', res),
  //   error: err => console.error('Erreur ajout commentaire', err)
  // });
  //----------------------------

  getPendingProfil(projectId: number): Observable<any> {
    return this._http.get(
      `${this.apiUrl}/systems/projectRecommendation?projectId=${projectId}`
    );
  }

  // this.myService.getPendingProfil(123).subscribe({
  //   next: profils => console.log('Profils en attente DESIGNER', profils),
  //   error: err => console.error('Erreur récupération profils', err)
  // });
}
