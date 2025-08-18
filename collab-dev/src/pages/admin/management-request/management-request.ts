// management-request.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { ProjectService } from '../../../core/services/project.service';
import { UsersService } from '../../../core/services/users.service';
import { SessionService } from '../../../core/services/session-service';
import { Iproject, IContributionRequest } from '../../../core/interfaces/project';
import { addManagerInfoI } from '../../../core/interfaces/manager/addManagerInfoI';
import { IApiResponse } from '../../../core/interfaces/api-response';

@Component({
  selector: 'app-management-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management-request.html',
  styleUrls: ['./management-request.css']
})
export class ManagementRequest implements OnInit {
  project: Iproject | undefined;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sessionService: SessionService,
    public usersService: UsersService, // ⚠️ public car utilisé dans le template
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProjectWithManagerRequests(projectId);
  }

  loadProjectWithManagerRequests(projectId: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.projectService.getProjectById(projectId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response: IApiResponse<Iproject>) => {
          if (response.data) {
            this.project = response.data;
            this.loadPendingManagers(projectId);
          }
        },
        error: (err) => {
          console.error('Erreur chargement projet:', err);
          this.errorMessage = 'Erreur lors du chargement du projet';
        }
      });
  }

  loadPendingManagers(projectId: number): void {
  this.isLoading = true;

  this.projectService.getProjectWithManagerRequests(projectId)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (response: IApiResponse<any[]>) => {
        console.log('Données reçues pour pendingManagers:', response.data); // Ajoute ce log
        if (response.data && this.project) {
          this.project.contributionRequests = response.data.map(manager => ({
            id: manager.id,
            candidateProfileId: manager.id,
            candidateName: manager.pseudo ?? 'Utilisateur inconnu',
            userId: manager.userId,
            requestDate: manager.createdDate
          }));
        } else {
          this.errorMessage = 'Aucune demande trouvée ou format invalide';
        }
      },
      error: (err) => {
        console.error('Erreur chargement demandes:', err);
        this.errorMessage = 'Erreur lors du chargement des demandes';
      }
    });
}

  getInitials(name: string): string {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  }

acceptRequest(request: IContributionRequest): void {
  if (!this.project) return;
  this.isLoading = true;

  const managerInfo: addManagerInfoI = {
    id: request.candidateProfileId,
    // Les autres champs ne sont probablement pas nécessaires pour cette requête
  };

  this.projectService.acceptManagerRequest(this.project.id, managerInfo)
    .subscribe({
      next: (response) => {
        if (response.code === '202' && response.message.includes('Le projet a déjà un Manager')) {
          this.errorMessage = 'Ce projet a déjà un manager assigné.';
        } else {
          this.loadProjectWithManagerRequests(this.project!.id);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur acceptation:', err);
        this.errorMessage = 'Erreur lors de l\'acceptation de la demande';
        this.isLoading = false;
      }
    });
}

  rejectRequest(request: IContributionRequest): void {
  if (!this.project || !request.userId) return;  // Vérifie userId

  this.isLoading = true;

  this.projectService.rejectManagerRequest(this.project.id, request.userId)  // Utilise userId
    .subscribe({
      next: () => this.loadProjectWithManagerRequests(this.project!.id),
      error: (err) => {
        console.error('Erreur rejet:', err);
        this.errorMessage = 'Erreur lors du rejet de la demande';
        this.isLoading = false;
      }
    });
}
}
