import { Component } from '@angular/core';

import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { ProjectFormComponent } from '../shared/project-form/project-form.component';
import { SubmitProjectFormComponent } from '../shared/submit-project-form/submit-project-form.component';


import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    //UserSidebarComponent,
    //ProjectFormComponent
    SubmitProjectFormComponent
  ],

  imports: [RouterOutlet],


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
