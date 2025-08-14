import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectManagerService } from '../../../core/services/project-manager-service';
import { AdminService } from '../../../core/services/admin';
import { Iproject, IContributionRequest } from '../../../core/interfaces/project';

@Component({
  selector: 'app-management-request',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './management-request.html',
  styleUrl: './management-request.css'
})
export class ManagementRequest implements OnInit {
  project: Iproject | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectManagerService: ProjectManagerService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));

    this.projectManagerService.getProjectById(projectId).subscribe(project => {
      this.project = project;
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  accept(requestId: number): void {
    if (this.project) {
      const currentProject = this.project;
      const requestToAccept = currentProject.contributionRequests.find(req => req.id === requestId);

      if (requestToAccept) {
        this.adminService.attributeManagerToProject(currentProject.id, requestToAccept.candidateProfileId)
          .subscribe({
            next: (response) => {
              console.log('Manager attribué avec succès:', response);
              currentProject.contributionRequests = currentProject.contributionRequests.filter(req => req.id !== requestId);
              if (!currentProject.managerId) {
                currentProject.managerId = { id: requestToAccept.candidateProfileId, name: requestToAccept.candidateName, bio: 'Manager attribué' };
              }
            },
            error: (error) => {
              console.error('Erreur lors de l\'attribution du manager:', error);
            }
          });
      }
    }
  }

  reject(requestId: number): void {
    if (this.project) {
      const currentProject = this.project;
      currentProject.contributionRequests = currentProject.contributionRequests.filter(req => req.id !== requestId);
      console.log(`Demande ${requestId} refusée pour le projet ${currentProject.title}.`);
    }
  }
}
