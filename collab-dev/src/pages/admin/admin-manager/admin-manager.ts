import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Iproject } from '../../../core/interfaces/project';

@Component({
  selector: 'app-admin-manager',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-manager.html',
  styleUrl: './admin-manager.css',
})
export class AdminManager implements OnInit {
  projects: Iproject[] = [];
  filteredProjects: Iproject[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.projectService.getProjectsWithManagerPendingRequests().subscribe({
      next: (response) => {
        this.projects = Array.isArray(response.data) ? 
          response.data.filter((item): item is Iproject => 'title' in item && 'createdDate' in item) : 
          [];
        
        this.filteredProjects = [...this.projects];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des projets';
        console.error('Erreur:', err);
      }
    });
  }

  filterProjects(): void {
    if (!this.searchQuery) {
      this.filteredProjects = [...this.projects];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredProjects = this.projects.filter(project => 
      project.title?.toLowerCase().includes(query) ||
      this.formatDate(project.createdDate).toLowerCase().includes(query)
    );
  }

  viewManagementRequests(projectId: number): void {
    this.router.navigate(['/admin/management-requests', projectId]);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }
}