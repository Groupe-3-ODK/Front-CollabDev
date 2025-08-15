
import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PopUp } from '../shared/reusablesComponents/pop-up/pop-up';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PopUp, RouterOutlet, DashboardComponent],
  templateUrl: './app.component.html',
  providers: [CookieService],
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private cookieService = inject(CookieService);

  ngOnInit(): void {
    this.cookieService.deleteAll('/');
  }

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
}