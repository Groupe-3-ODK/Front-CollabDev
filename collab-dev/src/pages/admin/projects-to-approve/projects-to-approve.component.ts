import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-projects-to-approve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-to-approve.component.html',
  styleUrl: './projects-to-approve.component.css',
})
export class ProjectsToApproveComponent {
  projects: any = [
    // {
    //   name: 'API',
    //   level: 'DEBUTANT',
    //   githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev',
    //   manager: 'aissatou',
    //   status: 'En-attente',
    // },
    // {
    //   name: 'API',
    //   level: 'INTERMEDIAIRE',
    //   githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev',
    //   manager: 'aissatou',
    //   status: 'En-attente',
    // },
    // {
    //   name: 'API',
    //   level: 'DEBUTANT',
    //   githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev',
    //   manager: 'aissatou',
    //   status: 'En-attente',
    // },
    // {
    //   name: 'API',
    //   level: 'AVANCE',
    //   githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev',
    //   manager: 'aissatou',
    //   status: 'En-attente',
    // },
    // {
    //   name: 'API',
    //   level: 'DEBUTANT',
    //   githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev',
    //   manager: 'aissatou',
    //   status: 'En-attente',
    // },
    // {
    //   name: 'API',
    //   level: 'DEBUTANT',
    //   githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev',
    //   manager: 'aissatou',
    //   status: 'En-attente',
    // },
  ];

  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;

  private _projectService = inject(ProjectService);

  ngOnInit(): void {
    this.getDoneProject();
    // this.updateMetrics();
  }

  updateMetrics(): void {
    this.pendingCount = this.projects.filter(
      (p: any) => p.status === 'DONE'
    ).length;
    this.approvedCount = this.projects.filter(
      (p: any) => p.status === 'VALIDATED'
    ).length;
    this.rejectedCount = this.projects.filter(
      (p: any) => p.status === 'IN_PROGRESS'
    ).length;
  }

  approveProject(project: any): void {
    // Logique pour valider le projet
    this._projectService.validateProject(project.managerId, project.id);
    project.status = 'VALIDATED';
    this.updateMetrics();
  }

  rejectProject(project: any): void {
    // Logique pour refuser le projet
    project.status = 'IN_PROGRESS';
    this.updateMetrics();
  }
  getDoneProject() {
    this._projectService.getProjectByStatus('DONE').subscribe({
      next: (response) => {
        this.projects = response.data;
        console.log(this.projects);
        this.updateMetrics();
      },
      error: (error) => {
        console.error(
          'Erreur lors de la repuration de projects terminer',
          error
        );
      },
    });
  }
}
