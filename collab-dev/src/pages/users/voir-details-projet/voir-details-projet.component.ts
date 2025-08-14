import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Member {
  initials: string;
  name: string;
  badge?: string;
}

@Component({
  selector: 'app-voir-details-projet',
  imports: [CommonModule],
  templateUrl: './voir-details-projet.component.html',
  styleUrl: './voir-details-projet.component.css',
})
export class VoirDetailsProjetComponent {
showModal = false;


  members: Member[] = [
    { initials: 'FD', name: 'Fatoumata Diawara', badge: '🏅' },
    { initials: 'MS', name: 'Modibo Sangaré', badge: '🏅' },
    { initials: 'HS', name: 'Hamza Sanmo', badge: '🏅' },
    { initials: 'AC', name: 'Aichatou Coulibaly', badge: '🏅' },
    { initials: 'SD', name: 'Seydou Dembele', badge: '🏅' },
    { initials: 'YS', name: 'Yacouba Sanogo', badge: '🏅' },
    { initials: 'SK', name: 'Sekou Keita', badge: '🏅' },
    { initials: 'EL', name: 'Elinka Lika', badge: '🏅' }
  ];


  openModal() {
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
  }


  onOverlayClick(event: MouseEvent) {
    if ((<HTMLElement>event.target).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

}
