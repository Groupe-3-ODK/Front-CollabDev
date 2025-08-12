import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-accepter-manager',
  imports: [],
  templateUrl: './accepter-manager.html',
  styleUrl: './accepter-manager.css'
})
export class AccepterManager implements OnInit, OnDestroy {
  rowsPerPage = 5;
  currentPage = 1;
  private allTableRows: HTMLElement[] = []; // Tableau de toutes les lignes
  private filteredRows: HTMLElement[] = []; // Tableau des lignes filtrées

  private dropdownMenu!: HTMLDivElement;
  private searchInput!: HTMLInputElement;
  private filterButton!: HTMLDivElement;
  private filterContainer!: HTMLDivElement;

  constructor() {}

  ngOnInit(): void {
    // Sélection des éléments du DOM
    this.allTableRows = Array.from(document.querySelectorAll('.table-row:not(.table-header)')) as HTMLElement[];
    this.searchInput = document.querySelector('.search-box input') as HTMLInputElement;
    this.filterButton = document.querySelector('.filter-roles-button') as HTMLDivElement;
    this.filterContainer = document.querySelector('.filter-roles-container') as HTMLDivElement;
    const pageNumbersContainer = document.querySelector('.page-numbers') as HTMLDivElement;
    const prevButton = document.querySelector('.pagination-button:first-of-type') as HTMLButtonElement;
    const nextButton = document.querySelector('.pagination-button:last-of-type') as HTMLButtonElement;
    const checkIcons = document.querySelectorAll('.check-icon');
    const crossIcons = document.querySelectorAll('.cross-icon');

    // Création et ajout du menu déroulant
    this.dropdownMenu = document.createElement('div');
    this.dropdownMenu.className = 'filter-dropdown-menu';
    this.dropdownMenu.style.position = 'absolute';
    this.dropdownMenu.style.top = 'calc(100% + 5px)';
    this.dropdownMenu.style.right = '0';
    this.dropdownMenu.style.backgroundColor = '#fff';
    this.dropdownMenu.style.border = '1px solid #D9D9D9';
    this.dropdownMenu.style.borderRadius = '8px';
    this.dropdownMenu.style.padding = '10px';
    this.dropdownMenu.style.zIndex = '10';
    this.dropdownMenu.style.display = 'none';
    this.dropdownMenu.innerHTML = `
      <div class="filter-option" data-role="all">Tous les rôles</div>
      <div class="filter-option" data-role="badge-red">Badge Rouge</div>
      <div class="filter-option" data-role="badge-yellow">Badge Jaune</div>
      <div class="filter-option" data-role="badge-green">Badge Vert</div>
      <div class="filter-option" data-role="folder">Dossier</div>
    `;
    if (this.filterContainer) {
      this.filterContainer.appendChild(this.dropdownMenu);
    }

    // Ajout des écouteurs d'événements
    this.searchInput.addEventListener('input', () => this.onSearchInput());
    this.filterButton.addEventListener('click', () => this.toggleDropdown());
    document.addEventListener('click', (e) => this.onClickOutside(e));
    
    document.querySelectorAll('.filter-option').forEach(option => {
      option.addEventListener('click', (e) => this.onFilterOptionClick(e));
    });

    if (prevButton) prevButton.addEventListener('click', () => this.onPreviousPage());
    if (nextButton) nextButton.addEventListener('click', () => this.onNextPage());
    
    checkIcons.forEach(icon => icon.addEventListener('click', (e) => this.onActionClick(e, 'accepted')));
    crossIcons.forEach(icon => icon.addEventListener('click', (e) => this.onActionClick(e, 'cancelled')));

    this.applyFilters();
  }

  ngOnDestroy(): void {
    this.searchInput.removeEventListener('input', () => this.onSearchInput());
    this.filterButton.removeEventListener('click', () => this.toggleDropdown());
    document.removeEventListener('click', (e) => this.onClickOutside(e));
  }

  // --- Méthodes du composant ---

  applyFilters(): void {
    const searchTerm = this.searchInput.value.toLowerCase();
    const selectedRole = this.filterButton.dataset['activeRole'] || 'all';

    // Filtrer sur le tableau de toutes les lignes, pas seulement celles affichées
    this.filteredRows = this.allTableRows.filter(row => {
      const managerNameElement = row.querySelector('.manager-name') as HTMLElement;
      const statusIcon = row.querySelector('.status-badge-icon') as HTMLImageElement;
      let role = '';
      
      if (statusIcon) {
        const src = statusIcon.getAttribute('src') || '';
        if (src.includes('Group 570.png')) role = 'badge-red';
        else if (src.includes('streamline-flex-color_star-badge-flat.png')) role = 'badge-yellow';
        else if (src.includes('streamline-flex-color_star-badge-flat (1).png')) role = 'badge-green';
      }
      
      const managerName = managerNameElement ? managerNameElement.textContent?.toLowerCase() || '' : '';
      const matchesSearch = managerName.includes(searchTerm);
      const matchesFilter = selectedRole === 'all' || role === selectedRole;
      
      return matchesSearch && matchesFilter;
    });

    const totalPages = Math.ceil(this.filteredRows.length / this.rowsPerPage);
    if (this.currentPage > totalPages) {
      this.currentPage = Math.max(1, totalPages);
    }

    // Masquer toutes les lignes et afficher uniquement celles de la page courante
    this.allTableRows.forEach(row => row.style.display = 'none');
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.filteredRows.slice(start, end).forEach(row => row.style.display = 'grid');
    
    this.updatePaginationButtons(totalPages);
  }

  updatePaginationButtons(totalPages: number): void {
    const pageNumbersContainer = document.querySelector('.page-numbers') as HTMLDivElement;
    if (!pageNumbersContainer) return;
    pageNumbersContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = 'pagination-button';
      pageButton.textContent = i.toString();
      if (i === this.currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        this.currentPage = i;
        this.applyFilters();
      });
      pageNumbersContainer.appendChild(pageButton);
    }

    const prevButton = document.querySelector('.pagination-button:first-of-type') as HTMLButtonElement;
    const nextButton = document.querySelector('.pagination-button:last-of-type') as HTMLButtonElement;
    if (prevButton) prevButton.disabled = this.currentPage === 1;
    if (nextButton) nextButton.disabled = this.currentPage === totalPages || totalPages === 0;
  }

  onSearchInput(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  toggleDropdown(): void {
    this.dropdownMenu.style.display = this.dropdownMenu.style.display === 'block' ? 'none' : 'block';
  }

  onClickOutside(e: MouseEvent): void {
    const filterContainer = document.querySelector('.filter-roles-container');
    if (filterContainer && !filterContainer.contains(e.target as Node)) {
      this.dropdownMenu.style.display = 'none';
    }
  }

  onFilterOptionClick(e: Event): void {
    const option = e.target as HTMLDivElement;
    const span = this.filterButton.querySelector('span');
    if (span) {
      span.textContent = option.textContent;
    }
    this.filterButton.dataset['activeRole'] = option.dataset['role'];
    this.dropdownMenu.style.display = 'none';
    this.currentPage = 1;
    this.applyFilters();
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  onNextPage(): void {
    const totalPages = Math.ceil(this.filteredRows.length / this.rowsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  onActionClick(e: Event, action: 'accepted' | 'cancelled'): void {
    const icon = e.target as HTMLElement;
    const row = icon.closest('.table-row') as HTMLElement;
    const managerNameElement = row.querySelector('.manager-name') as HTMLElement;
    const managerName = managerNameElement ? managerNameElement.textContent?.trim() : 'cet utilisateur';
    
    if (confirm(`Voulez-vous que ${managerName} soit ${action}?`)) {
      if (row) {
        // Retirer la ligne du DOM
        row.remove();
        // Retirer la ligne des tableaux de données
        this.allTableRows = this.allTableRows.filter(r => r !== row);
        this.filteredRows = this.filteredRows.filter(r => r !== row);
      }
      alert(`${managerName} a été ${action} et retiré du tableau.`);
      this.applyFilters();
    }
  }
}