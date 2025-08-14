import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/reusablesComponents/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { IApiResponse } from '../../../core/interfaces/api-response';
import { SessionService } from '../../../core/services/session-service';
import { Iproject } from '../../../core/interfaces/projectI';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentFilter: string = 'all';
  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  projects: Iproject[] = [];
  filteredProjects: Iproject[] = [];
  userId: number = 0;

  constructor(
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
    this.userId = 8; // ID en dur pour les tests
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
            DONE: this.completedCount
          });
        }
      },
      error: (err) => {
        console.error('Erreur API', {
          status: err.status,
          message: err.message,
          url: err.url // Vérifiez l'endpoint appelé
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
    return this.projects.filter((project) => project.status === 'TODO').length;
  }

  get inProgressCount(): number {
    return this.projects.filter((project) => project.status === 'IN_PROGRESS').length;
  }

  get completedCount(): number {
    return this.projects.filter((project) => project.status === 'DONE').length;
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
}