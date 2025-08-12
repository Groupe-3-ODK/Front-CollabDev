import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-chip',
  imports: [FormsModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
})
export class ChipComponent {
  currentFilter: string = 'all';
  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  projects = [
    {
      id: 1,
      title: 'ALP',
      status: 'in-progress',
      description: 'Api de gestion de projets collaboratifs',
      technologies: ['Spring boot', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: 3,
    },
    {
      id: 2,
      title: 'Appli de santé',
      status: 'in-progress',
      description: 'Application mobile pour le suivi médical',
      technologies: ['Flutter', 'Firebase', 'Dart'],
      progress: 30,
      collaborators: 2,
    },
    {
      id: 3,
      title: 'E-learning',
      status: 'completed',
      description: 'Plateforme de cours en ligne',
      technologies: ['React', 'Node.js', 'MongoDB'],
      progress: 100,
      collaborators: 3,
    },
    {
      id: 4,
      title: 'Good tech',
      status: 'todo',
      description: 'Site web pour une startup technologique',
      technologies: ['Vue.js', 'Laravel', 'MySQL'],
      progress: 0,
      collaborators: 3,
    },
    {
      id: 5,
      title: 'Gestion de stock',
      status: 'todo',
      description: "Système de gestion d'inventaire",
      technologies: ['Java', 'Spring', 'PostgreSQL'],
      progress: 0,
      collaborators: 2,
    },
  ];

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.searchQuery = query;
      });
  }

  get filteredProjects() {
    let filtered = this.projects;

    // Filter by status
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(
        (project) => project.status === this.currentFilter
      );
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(query)
          )
      );
    }

    return filtered;
  }

  get todoCount(): number {
    return this.projects.filter((project) => project.status === 'todo').length;
  }

  get inProgressCount(): number {
    return this.projects.filter((project) => project.status === 'in-progress')
      .length;
  }

  get completedCount(): number {
    return this.projects.filter((project) => project.status === 'completed')
      .length;
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }

  resetFilter(): void {
    this.currentFilter = 'all';
    this.searchQuery = '';
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }
}
