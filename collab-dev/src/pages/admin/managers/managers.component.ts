import { Component } from '@angular/core';
import { ManagerCardComponent } from '../../../shared/reusablesComponents/manager-card/manager-card.component';
import { SearchbarComponent } from '../../../shared/reusablesComponents/searchbar/searchbar.component';
import { SnackbarComponent } from '../../../shared/reusablesComponents/snackbar/snackbar.component';
import { TableComponent } from '../../../shared/reusablesComponents/table/table.component';

@Component({
  selector: 'app-managers',
  imports: [
    ManagerCardComponent,
    TableComponent,
    SearchbarComponent,
    SnackbarComponent,
  ],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css',
})
export class ManagersComponent {
  searchTerm = '';
  projects = [
    {
      title: 'LangZone',
      description: 'Application pour gérer les langues dynamiquement.',
      status: 'En cours',
      level: 'Intermédiaire',
      stack: ['Spring boot', 'Angular', 'TypeScript'],
      progress: 75,
      collaborators: 3,
      author: 'Seydhou Dembele',
    },
    // Ajoute d’autres projets ici
  ];

  get filteredProjects() {
    return this.projects.filter((project) =>
      project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(term: string) {
    this.searchTerm = term;
  }

  onFilter() {
    alert('Filtrage à implémenter');
  }
}
