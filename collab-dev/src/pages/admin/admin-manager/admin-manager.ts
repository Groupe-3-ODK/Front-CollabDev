import { CommonModule } from '@angular/common'; // Ajout de CommonModule pour *ngFor
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Iproject } from '../../../core/interfaces/project';
import { ProjectManagerService } from '../../../core/services/project-manager-service';

@Component({
  selector: 'app-admin-manager',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule, // CommonModule est nécessaire pour les directives structurelles comme *ngFor
  ],
  templateUrl: './admin-manager.html',
  styleUrl: './admin-manager.css',
})
export class AdminManager implements OnInit {
  projects: Iproject[] = [];
  filteredProjects: Iproject[] = [];
  searchQuery: string = '';

  constructor(
    private projectManagerService: ProjectManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectManagerService.getProjects().subscribe((data) => {
      this.projects = data;
      this.filteredProjects = data;
    });
  }

  filterProjects(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProjects = this.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.createdDate.includes(query)
    );
  }

  viewManagementRequests(projectId: number): void {
    console.log(
      `Naviguer vers les demandes de gestion pour le projet ID: ${projectId}`
    );
    this.router.navigate(['/admin/management-requests', projectId]);
  }
}
