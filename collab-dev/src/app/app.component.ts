import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { LandingPageTwo } from '../components/landing-page-two/landing-page-two';
import { CreateTaskModal } from '../shared/reusablesComponents/create-task-modal/create-task-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPageTwo, CreateTaskModal],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';

  // Variable qui contrôle l'affichage du modal
  isModalVisible: boolean = true;

  // Méthode pour ouvrir le modal
  openModal(): void {
    this.isModalVisible = true;
  }

  // Méthode appelée lorsque le modal émet l'événement 'closeModal'
  onModalClose(): void {
    this.isModalVisible = false;
  }

  // Méthode appelée lorsque le modal émet l'événement 'saveData'
  onProjectSave(data: any): void {
    console.log('Données du projet enregistrées:', data);
    // Ici, vous pouvez ajouter la logique pour traiter les données
    this.isModalVisible = false;
  }
}
