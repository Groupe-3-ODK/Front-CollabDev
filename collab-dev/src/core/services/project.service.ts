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
import { Iproject } from '../interfaces/projectI';

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

  private apiUserUrl =
    environment.API_BASE_URL + CONSTANT.USER_RESSOURCES.USERS;

  private apiUrl = environment.API_BASE_URL;

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

  validateProject(managerId: number, projectId: number): Observable<string> {
    const params = new HttpParams()
      .set('managerId', managerId.toString())
      .set('projectId', projectId.toString());

    return this._http.put<string>(
      `${this.apiUrl}/managerInfo/validateProject`,
      null, // pas de body
      { params }
    );
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

  selectProfilAndAddToProject(
    projectId: number,
    profileId: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('profileId', projectId.toString())
      .set('projectId', projectId.toString());

    return this._http.post<any>(
      `${this.apiUrl}/managerInfo/selectProfilAndAddToProject`,
      { params }
    );
  }

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

  
setCurrentProject(project: Iproject): void {
  localStorage.setItem('currentProject', JSON.stringify(project));
}

getCurrentProject(): Iproject | null {
  const stored = localStorage.getItem('currentProject');
  return stored ? JSON.parse(stored) : null;
}

  // this.myService.getPendingProfil(123).subscribe({
  //   next: profils => console.log('Profils en attente DESIGNER', profils),
  //   error: err => console.error('Erreur récupération profils', err)
  // });
}
