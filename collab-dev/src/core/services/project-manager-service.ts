    import { Injectable, inject } from '@angular/core'; // Importer 'inject' et 'HttpClient'
    import { HttpClient } from '@angular/common/http'; // Importer HttpClient
    import { Observable, of } from 'rxjs'; // 'of' est toujours utile pour les mocks de test si besoin, mais 'HttpClient' retourne des Observables.
    import { Iproject, IContributionRequest } from '../interfaces/project';
    import { environment } from '../../environments/environment';
    import { CONSTANT } from '../../core/constants/contant'; // Importer les constantes pour les chemins d'API

    @Injectable({
      providedIn: 'root'
    })
    export class ProjectManagerService {
      private _http = inject(HttpClient);
      private apiProjectsUrl = environment.API_BASE_URL + CONSTANT.PROJECT_RESSOURCES.PROJECTS;
      private projects: Iproject[] = [];
      getProjects(): Observable<Iproject[]> {
        console.log(`Appel API: GET ${this.apiProjectsUrl}`);
        return this._http.get<Iproject[]>(this.apiProjectsUrl);
      }
      getProjectById(id: number): Observable<Iproject | undefined> {
        const url = `${this.apiProjectsUrl}/${id}`; 
        console.log(`Appel API: GET ${url}`);
        return this._http.get<Iproject>(url);
      }
      acceptRequest(projectId: number, requestId: number): void {
        console.log(`Logique locale ProjectManagerService.acceptRequest pour UI: Demande ${requestId} pour projet ${projectId}.`);
      }
      rejectRequest(projectId: number, requestId: number): void {
        console.log(`Logique locale ProjectManagerService.rejectRequest pour UI: Demande ${requestId} pour projet ${projectId}.`);
      }
      getPendingManagerRequests(): Observable<Iproject[]> {
        console.log("Appel ProjectManagerService.getPendingManagerRequests - pourrait nécessiter un endpoint API spécifique.");
        return of(this.projects.filter(p => p.contributionRequests && p.contributionRequests.length > 0));
      }
    }
    