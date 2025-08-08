// view-projects.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Project {
  id: number;
  title: string;
  description: string;
  level: string;
  domain: string;
  status: string;
  contributors: string[]; 
  createdDate: Date;
  isFavorite: boolean;
  domainColor: string; 
}

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-projects.html',
  styleUrl: './view-projects.css'
})
export class ViewProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'title';
  filterOptions: { [key: string]: string[] } = {
    title: [],
    level: ['Débutant', 'Intermédiaire', 'Avancé'],
    domain: ['Technologie', 'Design', 'Marketing'],
    status: ['En cours', 'Planifié', 'Terminé']
  };

  domainColors = ['#8A2BE2', '#FFD700', '#40E0D0', '#FF4500', '#ADFF2F'];
  selectedProject: Project | null = null; // Pour suivre le projet sélectionné dans la modale

  ngOnInit() {
    this.projects = [
      { id: 1, title: 'Projet Tech 1', description: 'Développement d\'une application mobile.', level: 'Intermédiaire', domain: 'Technologie', status: 'En cours', contributors: ['Jean', 'Marie', 'Paul','Jean', 'Marie', 'Paul','Jean', 'Marie', 'Paul','Jean', 'Marie', 'Paul'], createdDate: new Date('2025-08-05'), isFavorite: false, domainColor: this.getRandomColor() },
      { id: 2, title: 'Design Créatif', description: 'Conception d\'une interface utilisateur.', level: 'Débutant', domain: 'Design', status: 'Terminé', contributors: ['Sophie', 'Luc', 'Emma', 'Thomas'], createdDate: new Date('2025-07-15'), isFavorite: false, domainColor: this.getRandomColor() },
      { id: 3, title: 'Campagne Marketing', description: 'Lancement d\'une campagne digitale.', level: 'Avancé', domain: 'Marketing', status: 'Planifié', contributors: ['Alex', 'Clara'], createdDate: new Date('2025-07-01'), isFavorite: false, domainColor: this.getRandomColor() },
      { id: 4, title: 'Intelligence artificielle', description: 'Lancement d\'une campagne digitale.', level: 'Avancé', domain: 'IA', status: 'En cours', contributors: ['Alex', 'Clara'], createdDate: new Date('2025-07-01'), isFavorite: false, domainColor: this.getRandomColor() }
    ];
    this.filterProjects();
  }

  filterProjects() {
    let result = [...this.projects];
    if (this.searchTerm) {
      result = result.filter(project => {
        const value = project[this.selectedFilter as keyof Project]?.toString().toLowerCase() || '';
        return value.includes(this.searchTerm.toLowerCase());
      });
    }
    this.filteredProjects = result;
  }

  onSearchChange(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterProjects();
  }

  onFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.selectedFilter = selectElement.value;
      this.searchTerm = '';
      this.filterProjects();
    }
  }

  toggleFavorite(project: Project) {
    project.isFavorite = !project.isFavorite;
  }

  getRelativeDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'aujourd\'hui';
    if (diffDays === 1) return 'il y a 1 jour';
    if (diffDays < 7) return `il y a ${diffDays} jours`;
    if (diffDays < 30) return 'il y a une semaine';
    if (diffDays < 365) return 'il y a un mois';
    return 'il y a plus d\'un an';
  }

  getRandomColor(): string {
    return this.domainColors[Math.floor(Math.random() * this.domainColors.length)];
  }

  getAvatarColor(pseudo: string): string {
    let hash = 0;
    for (let i = 0; i < pseudo.length; i++) {
      hash = pseudo.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 50%)`;
  }

  showContributors(project: Project) {
    this.selectedProject = project;
  }

  closeModal(event: MouseEvent) {
    this.selectedProject = null;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}