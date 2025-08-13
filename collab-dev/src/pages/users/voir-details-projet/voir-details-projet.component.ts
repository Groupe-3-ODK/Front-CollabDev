import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Iproject } from '../../../core/interfaces/projectI';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-voir-details-projet',
  imports: [],
  templateUrl: './voir-details-projet.component.html',
  styleUrl: './voir-details-projet.component.css',
})
export class VoirDetailsProjetComponent {
  project?: Iproject;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private _projectsService: ProjectService
  ) {
    this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      // this.loadProjectDetails(projectId);
    });
  }

  // loadProjectDetails(projectId: number) {
  //   this._projectsService.getProjectById(projectId).subscribe({
  //     next: (project) => {
  //       this.project = project.data[1];
  //       this.loading = false;
  //     },
  //     error: (error: any) => {
  //       this.errorMessage = 'Erreur lors du chargement des détails du projet.';
  //       console.error(error);
  //       this.loading = false;
  //     },
  //   });
  // }
}
