import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Iproject } from '../../../core/interfaces/project';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-voir-details-projet',
  imports: [],
  standalone: true,
  templateUrl: './voir-details-projet.component.html',
  styleUrl: './voir-details-projet.component.css',
})
export class VoirDetailsProjetComponent implements OnInit {
  project?: Iproject;
  loading = true;
  errorMessage = '';
  projectId!: string;
  projectRecup!: any;
  dateFomat: string = '';

  constructor(
    private route: ActivatedRoute,
    private _projectsService: ProjectService
  ) {
    this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      // this.loadProjectDetails(projectId);
    });
  }
  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    console.log('Project ID from route:', this.projectId);
    this.loadProject(parseInt(this.projectId));
    this.dateFomat = this.userDateCreation(new Date());

    
  }

  loadProject(projectId: number): void {
    this._projectsService.getProjectById(projectId).subscribe(
      (data: any) => {
      this.projectRecup = data.data;
      console.log('Project ID:', this.projectRecup); // ici, la donnée est chargée
    },
      (error) => console.error(error)
    );
    
  }

  userDateCreation(date: Date): string {
    const now = new Date();
    const creationDate = new Date(date);

    const diffMs = now.getTime() - creationDate.getTime(); // différence en millisecondes
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffH = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffH / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) return `il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`;
    if (diffMonths > 0) return `il y a ${diffMonths} mois`;
    if (diffDays > 0) return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    if (diffH > 0) return `il y a ${diffH} heure${diffH > 1 ? 's' : ''}`;
    if (diffMin > 0) return `il y a ${diffMin} minute${diffMin > 1 ? 's' : ''}`;
    return `il y a quelques secondes`;
  }

  // loadProjectDetails(projectId: number) {
  //   this._projectsService.getProjectById(projectId).subscribe({
  //     next: (project) => {
  //       this.project = project.data[1];
  //       this.loading = false;
  //     },
  //     error: (error: any) => {
  //       this.errorMessage = 'E rreur lors du chargement des détails du projet.';
  //       console.error(error);
  //       this.loading = false;
  //     },
  //   });
  // }
}
