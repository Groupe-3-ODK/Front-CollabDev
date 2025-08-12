import { Component } from '@angular/core';

import { inject, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LandingPageTwo } from '../components/landing-page-two/landing-page-two';
import { GestionUserCoteAdminComponent } from '../pages/admin/gestion-user-cote-admin/gestion-user-cote-admin.component';
import { ConfigurationDuProjet } from '../pages/users/configuration-du-projet/configuration-du-projet';
import { CreerTache } from '../pages/users/creer-tache/creer-tache';
import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';
import { VoirDetailsProjetComponent } from '../pages/users/voir-details-projet/voir-details-projet.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ConfigurationDuProjet,
    CreerTache,
    DashboardComponent,
    VoirDetailsProjetComponent,
    GestionUserCoteAdminComponent,
    LandingPageTwo,
  ],
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
  }
}
