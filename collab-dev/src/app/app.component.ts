import { Component } from '@angular/core';
import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';
import { ProfilComponent } from '../pages/users/profil/profil.component';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    //ProjectFormComponent
    //SubmitProjectFormComponent,
    // DashboardComponent,
    ProfilComponent
  ],




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
