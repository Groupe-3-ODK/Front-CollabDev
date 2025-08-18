import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici

@Component({
  selector: 'app-trace-admin',
  imports: [FormsModule], // Ajoutez FormsModule à la liste des imports
  templateUrl: './trace-admin.html',
  styleUrl: './trace-admin.css'
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
    this.filteredProjects = this.projects;
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