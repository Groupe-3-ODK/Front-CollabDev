import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gestion-user-cote-admin',
  templateUrl: './gestion-user-cote-admin.component.html',
  styleUrls: ['./gestion-user-cote-admin.component.css']
})
export class GestionUserCoteAdminComponent implements AfterViewInit {

  @ViewChild('tableBody', { static: false }) tableBody!: ElementRef<HTMLTableSectionElement>;
  @ViewChild('userCount', { static: false }) userCountElement!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn', { static: false }) prevButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('nextBtn', { static: false }) nextButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('pageNumbers', { static: false }) pageNumbersContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('filterButton', { static: false }) filterButton!: ElementRef<HTMLDivElement>;
  @ViewChild('filterDropdown', { static: false }) filterDropdown!: ElementRef<HTMLDivElement>;

  allRows: HTMLElement[] = [];
  rowsPerPage = 5;
  currentPage = 1;
  currentFilter = 'all';

  ngAfterViewInit(): void {
    this.allRows = Array.from(this.tableBody.nativeElement.querySelectorAll('.table-row'));

    this.initListeners();

    this.filterAndPaginate(this.currentFilter);
    this.updateUserCounts();
  }

  initListeners(): void {
    this.allRows.forEach(row => {
      const button = row.querySelector('.action-button') as HTMLElement;
      if (button) {
        button.addEventListener('click', (e) => this.toggleStatus(e));
      }
    });

    this.searchInput.nativeElement.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.searchUsersAndFilter(target.value);
    });

    this.filterButton.nativeElement.addEventListener('click', () => {
      this.filterDropdown.nativeElement.classList.toggle('show');
    });

    document.addEventListener('click', (event: MouseEvent) => {
      if (
        !this.filterButton.nativeElement.contains(event.target as Node) &&
        !this.filterDropdown.nativeElement.contains(event.target as Node)
      ) {
        this.filterDropdown.nativeElement.classList.remove('show');
      }
    });

    const filterOptions = this.filterDropdown.nativeElement.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
      option.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        const filterValue = target.getAttribute('data-filter') || 'all';
        this.filterAndPaginate(filterValue);
        this.filterButton.nativeElement.querySelector('span')!.textContent = target.textContent || 'Tous';
        this.filterDropdown.nativeElement.classList.remove('show');
      });
    });

    this.prevButton.nativeElement.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateView();
      }
    });

    this.nextButton.nativeElement.addEventListener('click', () => {
      const filteredRows = this.getFilteredRows();
      const totalPages = Math.ceil(filteredRows.length / this.rowsPerPage);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.updateView();
      }
    });
  }

  toggleStatus(event: Event): void {
    const button = event.currentTarget as HTMLElement;
    const row = button.closest('.table-row') as HTMLElement;
    const statusCell = row.querySelector('.status-cell') as HTMLElement;
    const statusText = statusCell.querySelector('.status-text') as HTMLElement;

    if (statusCell.classList.contains('active')) {
      statusCell.classList.replace('active', 'inactive');
      row.setAttribute('data-status', 'inactive');
      statusText.textContent = 'Inactif';
      button.classList.replace('deactivate-button', 'activate-button');
      button.innerHTML = "<i class='bx bx-user-check'></i> Activer";
    } else {
      statusCell.classList.replace('inactive', 'active');
      row.setAttribute('data-status', 'active');
      statusText.textContent = 'Actif';
      button.classList.replace('activate-button', 'deactivate-button');
      button.innerHTML = "<i class='bx bx-user-x'></i> Désactiver";
    }

    this.updateUserCounts();
    this.filterAndPaginate(this.currentFilter);
  }

  updateUserCounts(): void {
    const totalUsers = this.allRows.length;
    const activeUsers = this.allRows.filter(row => row.getAttribute('data-status') === 'active').length;
    this.userCountElement.nativeElement.textContent = `${activeUsers} utilisateurs actifs sur ${totalUsers} au total`;
  }

  searchUsersAndFilter(query: string): void {
    this.currentPage = 1;
    this.updateView(query);
  }

  filterAndPaginate(filter: string): void {
    this.currentFilter = filter;
    this.currentPage = 1;
    this.updateView();
  }

  getFilteredRows(): HTMLElement[] {
    const query = this.searchInput.nativeElement.value.toLowerCase().trim();
    return this.allRows.filter(row => {
      const userName = (row.querySelector('.user-name-cell')?.textContent || '').toLowerCase();
      const status = row.getAttribute('data-status');
      const matchesSearch = userName.includes(query);
      const matchesFilter = this.currentFilter === 'all' || status === this.currentFilter;
      return matchesSearch && matchesFilter;
    });
  }

  displayRows(page: number, rowsToDisplay: HTMLElement[]): void {
    const start = (page - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.allRows.forEach(row => (row.style.display = 'none'));
    rowsToDisplay.slice(start, end).forEach(row => (row.style.display = 'table-row'));
  }

  updatePaginationControls(filteredRows: HTMLElement[], totalPages: number): void {
    this.prevButton.nativeElement.classList.toggle('disabled', this.currentPage === 1);
    this.nextButton.nativeElement.classList.toggle('disabled', this.currentPage === totalPages || totalPages === 0);

    const container = this.pageNumbersContainer.nativeElement;
    container.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i.toString();
      button.classList.add('pagination-button');
      if (i === this.currentPage) {
        button.classList.add('active');
      }
      button.addEventListener('click', () => {
        this.currentPage = i;
        this.updateView();
      });
      container.appendChild(button);
    }
  }

  updateView(query?: string): void {
    if (query !== undefined) {
      this.currentPage = 1;
      this.searchInput.nativeElement.value = query;
    }
    const filteredRows = this.getFilteredRows();
    const totalPages = Math.ceil(filteredRows.length / this.rowsPerPage);
    this.displayRows(this.currentPage, filteredRows);
    this.updatePaginationControls(filteredRows, totalPages);
    this.updateUserCounts();
  }
}
