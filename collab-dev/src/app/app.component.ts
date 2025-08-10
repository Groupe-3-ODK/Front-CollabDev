import { Component, inject, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AjoutEquipe } from '../pages/users/ajout-equipe/ajout-equipe';
import { ConfigurationDuProjet } from '../pages/users/configuration-du-projet/configuration-du-projet';
import { CreerTache } from '../pages/users/creer-tache/creer-tache';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AjoutEquipe, ConfigurationDuProjet, CreerTache],
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
