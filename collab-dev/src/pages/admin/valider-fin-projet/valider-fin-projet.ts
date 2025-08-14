import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-valider-fin-projet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './valider-fin-projet.html',
  styleUrl: './valider-fin-projet.css'
})
export class ValiderFinProjet implements OnInit  {

  projects = [
    { name: 'API', level: 'DEBUTANT', githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev', manager: 'aissatou', status: 'En-attente' },
    { name: 'API', level: 'INTERMEDIAIRE', githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev', manager: 'aissatou', status: 'En-attente' },
    { name: 'API', level: 'DEBUTANT', githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev', manager: 'aissatou', status: 'En-attente' },
    { name: 'API', level: 'AVANCE', githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev', manager: 'aissatou', status: 'En-attente' },
    { name: 'API', level: 'DEBUTANT', githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev', manager: 'aissatou', status: 'En-attente' },
    { name: 'API', level: 'DEBUTANT', githubLink: 'https://github.com/Groupe-3-ODK/Front-CollabDev', manager: 'aissatou', status: 'En-attente' }
  ];

  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;

  constructor() { }

  ngOnInit(): void {
    this.updateMetrics();
  }

  updateMetrics(): void {
    this.pendingCount = this.projects.filter(p => p.status === 'En-attente').length;
    this.approvedCount = this.projects.filter(p => p.status === 'Valider').length;
    this.rejectedCount = this.projects.filter(p => p.status === 'Refuser').length;
  }

  approveProject(project: any): void {
    // Logique pour valider le projet
    project.status = 'Valider';
    this.updateMetrics();
  }

  rejectProject(project: any): void {
    // Logique pour refuser le projet
    project.status = 'Refuser';
    this.updateMetrics();
  }

}
