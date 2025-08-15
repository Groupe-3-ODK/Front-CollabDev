
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminManager } from "../pages/admin/admin-manager/admin-manager";



@Component({
  selector: 'app-root',
  standalone: true,


  imports: [CommonModule, RouterOutlet, AdminManager],


  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}

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
    const projectId = data.projectId;
    const profilId = data.profilId;
  }
  //------------------------------------------------------
  showModal = true;

  onSubmit(profile: string) {
    console.log('Profil choisi :', profile);
    this.showModal = false; // ferme aussi après soumission
  }
}
