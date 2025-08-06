import { Component, EventEmitter, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-searchbar',
  imports: [BrowserModule, LucideAngularModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<void>();

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }

  onFilterClick() {
    this.filter.emit();
  }
}
