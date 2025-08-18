import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // N'oubliez pas d'importer FormsModule

@Component({
  selector: 'app-trace-admin',
  imports: [FormsModule, CommonModule], // Assurez-vous que FormsModule est bien dans le tableau des imports
  templateUrl: './trace-admin.html',
  styleUrls: ['./trace-admin.css'] // Correction de styleUrl à styleUrls
})
export class TraceAdmin implements OnInit {
  searchTerm: string = '';
  projects: any[] = [];
  filteredProjects: any[] = [];
  
  deliveredCount: number = 0;
  pendingCount: number = 0;
  rejectedCount: number = 0;

  ngOnInit() {
    this.projects = [
      { name: 'ALP', manager: 'Aïssatou', deliveryDate: '11/05/2025', status: 'Livré', statusClass: 'delivered' },
      { name: 'ALP', manager: 'Aïssatou', deliveryDate: '11/05/2025', status: 'Rejeté', statusClass: 'rejected' },
      { name: 'ALP', manager: 'Aïssatou', deliveryDate: '11/05/2025', status: 'En cours', statusClass: 'pending' },
      { name: 'ALP', manager: 'Aïssatou', deliveryDate: '11/05/2025', status: 'Livré', statusClass: 'delivered' },
      { name: 'ALP', manager: 'Aïssatou', deliveryDate: '11/05/2025', status: 'En cours', statusClass: 'pending' },
      { name: 'ALP', manager: 'Aïssatou', deliveryDate: '11/05/2025', status: 'Livré', statusClass: 'delivered' }
    ];

    this.filteredProjects = [...this.projects]; // Utilisation de l'opérateur de décomposition pour une copie superficielle

    // Mettre à jour les compteurs au chargement du composant
    this.updateCounts();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project => {
      const searchTermLower = this.searchTerm.toLowerCase();
      
      return (
        project.name.toLowerCase().includes(searchTermLower) ||
        project.manager.toLowerCase().includes(searchTermLower) ||
        project.deliveryDate.toLowerCase().includes(searchTermLower) ||
        project.status.toLowerCase().includes(searchTermLower)
      );
    });
  }

  updateCounts() {
    this.deliveredCount = this.projects.filter(p => p.status === 'Livré').length;
    this.pendingCount = this.projects.filter(p => p.status === 'En cours').length;
    this.rejectedCount = this.projects.filter(p => p.status === 'Rejeté').length;
  }
}