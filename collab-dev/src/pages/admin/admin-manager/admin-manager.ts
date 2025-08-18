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

    CommonModule ],

  templateUrl: './admin-manager.html',
  styleUrl: './admin-manager.css',
})
export class AdminManager implements OnInit {
  projects: any = [];
  filteredProjects: any = [];
  searchQuery: string = '';

  constructor(
    private projectManagerService: ProjectManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.projectManagerService.getProjects().subscribe(res => {
      this.projects = res.data;
      this.filteredProjects = res.data;

    });
  }
  getPendingProject(){

  }

  filterProjects(): void {
    const query = this.searchQuery.toLowerCase();

    interface Project {
      title: string;
      createdDate: string;
      // add other properties as needed
    }

    this.filteredProjects = this.projects.filter((project: Project) =>
      project.title.toLowerCase().includes(query) ||
      project.createdDate.includes(query)

    );
  }

  viewManagementRequests(projectId: number): void {

    console.log(`Naviguer vers les demandes de gestion pour le projet ID: ${projectId}`);

    this.router.navigate(['/admin/management-requests', projectId]);
  }
}
