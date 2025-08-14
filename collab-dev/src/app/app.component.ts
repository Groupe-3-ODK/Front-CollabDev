import { Component } from '@angular/core';

import { ProjectDoneComponent } from '../pages/users/project-done/project-done.component';
import { SignupComponent } from '../components/signup/signup';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password';
import { ViewProjectsComponent } from '../pages/users/view-projects/view-projects';
import { ValiderFinProjet } from "../pages/admin/valider-fin-projet/valider-fin-projet";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectDoneComponent, SignupComponent, ForgotPasswordComponent, ViewProjectsComponent, ValiderFinProjet],

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
