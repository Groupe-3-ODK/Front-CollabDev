import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // RouterModule pour les routes (standalone)
import { CommonModule } from '@angular/common'; // CommonModule pour *ngFor

import { ProjectManagerService } from '../../../core/services/project-manager-service';
import { Iproject, IContributionRequest } from '../../../core/interfaces/project'; // Importe Iproject et IContributionRequest

@Component({
  selector: 'app-management-request',
  standalone: true,
  imports: [
    RouterModule, // Nécessaire pour ActivatedRoute dans les composants standalone
    CommonModule // Nécessaire pour les directives structurelles comme *ngFor
  ],
  templateUrl: './management-request.html',
  styleUrl: './management-request.css'
})
export class ManagementRequest implements OnInit { // Implémente OnInit
  project: Iproject | undefined; // Stocke les données du projet courant

  constructor(
    private route: ActivatedRoute,
    private projectManagerService: ProjectManagerService
  ) { }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));

    this.projectManagerService.getProjectById(projectId).subscribe(project => {
      this.project = project;
    });
  }

  /**
   * Calcule les initiales d'un nom complet.
   * @param name Le nom complet du candidat.
   * @returns Les initiales du nom.
   */
  getInitials(name: string): string {
    if (!name) return '';
    // Divise le nom par les espaces, prend la première lettre de chaque partie, les joint et met en majuscules.
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  accept(requestId: number): void {
    if (this.project) {
      this.projectManagerService.acceptRequest(this.project.id, requestId);
      // Filtre la demande acceptée de la liste locale pour mettre à jour l'UI instantanément
      this.project.contributionRequests = this.project.contributionRequests.filter(req => req.id !== requestId);
    }
  }

  reject(requestId: number): void {
    if (this.project) {
      this.projectManagerService.rejectRequest(this.project.id, requestId);
      // Filtre la demande refusée de la liste locale
      this.project.contributionRequests = this.project.contributionRequests.filter(req => req.id !== requestId);
    }
  }
}
