import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCircle, faCalendarAlt, faTag, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface Project {
  id: string;
  level: string;
  name: string;
  author: string;
  date: string;
  category: string;
  role: string;
  githubLink: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Metric {
  name: string;
  value: number;
  change: string;
  progress: number;
  icon: string;
}

interface DomainStat {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin {
  // Icônes FontAwesome
  faGithub = faGithub;
  faUserCircle = faUserCircle;
  faCalendarAlt = faCalendarAlt;
  faTag = faTag;
  faCheckCircle = faCheckCircle;

  // Propriétés du composant
  searchQuery: string = '';
  
  projects: Project[] = [
    {
      id: 'ALP',
      level: 'Débutant',
      name: 'Application de mise en relation',
      author: 'Aissatou Coulibaly',
      date: '10/11/2025',
      category: 'E-commerce',
      role: 'Manager',
      githubLink: 'https://github.com/example1',
      status: 'pending'
    },
    {
      id: 'ALP',
      level: 'Débutant',
      name: 'Plateforme de e-learning',
      author: 'M. Diop',
      date: '05/11/2025',
      category: 'Éducation',
      role: 'Développeur',
      githubLink: 'https://github.com/example2',
      status: 'pending'
    },
    {
      id: 'ALP',
      level: 'Avancé',
      name: 'Système de gestion hospitalière',
      author: 'K. Traoré',
      date: '01/11/2025',
      category: 'Santé',
      role: 'Architecte',
      githubLink: 'https://github.com/example3',
      status: 'pending'
    }
  ];

  filteredProjects: Project[] = [...this.projects];

  metrics: Metric[] = [
    { name: 'Projets Total', value: 750, change: '+20%', progress: 80, icon: 'bi_folderProjets en cours1.png' },
    { name: 'Projets en attente de validation', value: this.projects.filter(p => p.status === 'pending').length, change: '+10%', progress: this.calculatePendingProgress(), icon: 'icomoon-free_clockProjets à faire1.png' },
    { name: 'Utilisateurs actifs', value: 100, change: '-20%', progress: 50, icon: 'octicon_person-24Profil1.png' },
    { name: 'Complétés ce mois', value: 1, change: '+28%', progress: 5, icon: 'VectorProjets terminés1.png' }
  ];

  domains: DomainStat[] = [
    { name: 'E-commerce', value: 90, color: 'orange' },
    { name: 'Santé', value: 70, color: 'green' },
    { name: 'Éducation', value: 50, color: 'gray' },
    { name: 'Finance', value: 80, color: 'oran' }
  ];

  private calculatePendingProgress(): number {
    const pendingProjects = this.projects.filter(p => p.status === 'pending').length;
    const maxForFullBar = 10; // 10 projets = 100% de la barre
    const progress = Math.min((pendingProjects / maxForFullBar) * 100, 100);
    return progress;
  }

  searchProjects(): void {
    if (!this.searchQuery) {
      this.filteredProjects = [...this.projects];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredProjects = this.projects.filter(project => 
      project.name.toLowerCase().includes(query) || 
      project.author.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query)
    );
  }

  openGithubLink(url: string): void {
    window.open(url, '_blank');
  }

  approveProject(index: number): void {
    this.filteredProjects[index].status = 'approved';
    this.filteredProjects.splice(index, 1);
    this.updateMetrics();
  }

  rejectProject(index: number): void {
    this.filteredProjects[index].status = 'rejected';
    this.filteredProjects.splice(index, 1);
    this.updateMetrics();
  }

  private updateMetrics(): void {
    const pendingCount = this.projects.filter(p => p.status === 'pending').length;
    this.metrics[1].value = pendingCount;
    this.metrics[1].progress = this.calculatePendingProgress();
    this.metrics[3].value += 1;
  }
}