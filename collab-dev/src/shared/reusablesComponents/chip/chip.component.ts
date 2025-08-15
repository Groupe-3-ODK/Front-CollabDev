import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
})
export class ChipComponent {
  /** Valeur de recherche actuelle */
  @Input() searchQuery: string = '';

  /** Filtre actif (ex: 'all', 'todo', etc.) */
  @Input() currentFilter: string = 'all';

  /** Événement émis quand la recherche change */
  @Output() searchChange = new EventEmitter<string>();

  /** Événement émis quand le filtre change */
  @Output() filterChange = new EventEmitter<string>();

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.searchChange.emit(query);
      });
  }

  /** Remet le filtre à 'all' et vide la recherche */
  resetFilter(): void {
    this.filterChange.emit('all');
    this.searchChange.emit('');
  }

  /** Gestion de la saisie dans la barre de recherche */
  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }
}
