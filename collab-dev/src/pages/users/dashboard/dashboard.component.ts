import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api-response';

import { Iproject, Task } from '../../../core/interfaces/project';

import { Iproject } from '../../../core/interfaces/project';
import { ProjectService } from '../../../core/services/project.service';

import { SessionService } from '../../../core/services/session-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentFilter: string = 'all';
  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  projects: any = [];
  filteredProjects: any = [];
  userId: number = 0;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private sessionService: SessionService
  ) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.searchQuery = query;

        this.filterProjects();
      });
  }

  ngOnInit(): void {
    /* TEST START */
    this.userId = 5; // ID en dur pour les tests
    console.warn('MODE TEST ACTIVÉ - UTILISATEUR ID:', this.userId);
    this.loadUserProjects();
    /* TEST END */

    /*
    this.userId = this.sessionService.getUserId();
    if (this.userId) {
      console.log('MODE RÉEL - UTILISATEUR ID:', this.userId);
      this.loadUserProjects();
    } else {
      console.error('Aucun ID utilisateur trouvé en session');
    }
    */
  }

  loadUserProjects(): void {
    console.log(`Chargement des projets pour l'utilisateur ${this.userId}...`);

    this.projectService.getAllProjectsByUser(this.userId).subscribe({
      next: (res: IApiResponse) => {
        console.debug('Réponse API:', res); // Debug complet

        if (res.code === '202' && res.data) {
          this.projects = res.data as Iproject[];
          this.filterProjects();

          // Debug du nombre de projets chargés
          console.log(`Projets chargés: ${this.projects.length}`, {
            TODO: this.todoCount,
            IN_PROGRESS: this.inProgressCount,
            DONE: this.completedCount,
            VALIDATED: this.validatedCount,
          });
        }
      },
      error: (err) => {
        console.error('Erreur API', {
          status: err.status,
          message: err.message,
          url: err.url, // Vérifiez l'endpoint appelé
        });
      },
    });
  }

  filterProjects(): void {
    let filtered = [...this.projects];

    // Filter by status
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(
        (project) => project.status === this.currentFilter.toUpperCase()
      );
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
    }

    this.filteredProjects = filtered;
  }

  get todoCount(): number {

    return this.projects.filter(
      (project: { status: string }) => project.status === 'TODO'
    ).length;
  }

  get inProgressCount(): number {
    return this.projects.filter(
      (project: { status: string }) => project.status === 'IN_PROGRESS'
    ).length;
  }

  get completedCount(): number {
    return this.projects.filter(
      (project: { status: string }) => project.status === 'DONE'
    ).length;
  }
  get validatedCount(): number {
    return this.projects.filter(
      (project: { status: string }) => project.status === 'VALIDATED'
    ).length;

  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
    this.filterProjects();
  }

  resetFilter(): void {
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.filterProjects();
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  // Méthode pour calculer la progression basée sur les tâches


  calculateProjectProgress(project: any): number {
    if (project.status === 'VALIDATED') return 100;
    if (project.status === 'DONE') return 100;
    if (project.status === 'TODO') return 0;

    if (project.tasks && project.tasks.length > 0) {
      const completedTasks = project.tasks.filter(
        (task: { status: string }) =>
          task.status === 'DONE' || task.status === 'VALIDATED'
      ).length;
      return Math.round((completedTasks / project.tasks.length) * 100);
    }


    // Fallback pour les projets sans tâches
    if (project.status === 'IN_PROGRESS') return 50;
    return 0;
  }

  // Méthode pour obtenir les initiales des collaborateurs
  getInitials(name: string): string {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(
      0
    )}`.toUpperCase();
  }

  // Méthode pour naviguer vers les détails du projet
  viewProjectDetails(project: Iproject): void {
    const currentUserId = this.sessionService.getUserId();
    if (!currentUserId) {
      this.router.navigate(['/login']);
      return;
    }

    // Vérification dans les membres du projet
    const userProfilesInProject = project.members.filter(
      (member) => member.id === currentUserId
    );

    const hasManagerProfile = userProfilesInProject.some(
      (profile) => profile.name === 'MANAGER'
    );

    if (hasManagerProfile) {
      this.projectService.getProjectById(project.id);
      this.router.navigate(['/users/voir-details-projet', project.id]);
    } else if (userProfilesInProject.length > 0) {
      this.router.navigate(['/users/project-limited-view', project.id]);
    } else {
      this.router.navigate(['/access-denied']);
    }
  }
}
