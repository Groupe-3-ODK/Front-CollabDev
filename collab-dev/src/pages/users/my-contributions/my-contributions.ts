import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-contributions',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-contributions.html',
  styleUrl: './my-contributions.css',
})
export class MyContributions {
  // Filtre actuel pour les projets
  filter: string = 'all';

  // Liste des projets avec des données d'exemple
  projects: any[] = [
    {
      avatar: 'assets/avatar1.png',
      name: 'ALP',
      level: 'Débutant',
      endDate: '22/06/2025',
      collaborators: 10,
      status: 'En cours',
      category: 'code', // Ajout de la catégorie pour le filtre et l'icône
    },
    {
      avatar: 'assets/avatar2.png',
      name: 'ALP',
      level: 'Intermédiaire',
      endDate: '22/06/2025',
      collaborators: 10,
      status: 'En cours',
      category: 'design', // Ajout de la catégorie
    },
    {
      avatar: 'assets/avatar3.png',
      name: 'ALP',
      level: 'Débutant',
      endDate: '22/06/2025',
      collaborators: 10,
      status: 'Fermé',
      category: 'code', // Ajout de la catégorie
    },
    {
      avatar: 'assets/avatar4.png',
      name: 'ALP',
      level: 'Débutant',
      endDate: '22/06/2025',
      collaborators: 0,
      status: 'En cours',
      category: 'management', // Ajout de la catégorie
    },
    {
      avatar: 'assets/avatar5.png',
      name: 'ALP',
      level: 'Débutant',
      endDate: '22/06/2025',
      collaborators: 0,
      status: 'En cours',
      category: 'code', // Ajout de la catégorie
    },
    {
      avatar: 'assets/avatar6.png',
      name: 'ALP',
      level: 'Intermédiaire',
      endDate: '22/06/2025',
      collaborators: 10,
      status: 'En cours',
      category: 'design', // Ajout de la catégorie
    },
  ];

  /**
   * Retourne la liste des projets filtrés en fonction du filtre actuel.
   * @returns {any[]} La liste des projets filtrés.
   */
  get filteredProjects(): any[] {
    if (this.filter === 'all') {
      return this.projects;
    } else {
      // Filtrer les projets par catégorie
      return this.projects.filter(
        (project) => project.category === this.filter
      );
    }
  }

  /**
   * Définit le filtre actuel pour les projets.
   * @param filter La valeur du filtre.
   */
  setFilter(filter: string): void {
    this.filter = filter;
  }

  /**
   * Retourne la couleur de fond en fonction du niveau du projet.
   * @param level Le niveau du projet.
   * @returns {string} Le code couleur hexadécimal.
   */
  getLevelColor(level: string): string {
    switch (level) {
      case 'Débutant':
        return '#DDEEBB';
      case 'Intermédiaire':
        return '#92D3FB';
      case 'Avancé':
        return '#FBC792'; // J'ai ajouté une couleur pour le niveau avancé
      default:
        return '#FFFFFF';
    }
  }
}
