

import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';



import { inject, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';
import { AdminFormComponent } from '../pages/users/admin-form/admin-form.component';

import { CookieService } from 'ngx-cookie-service';

import { LandingPageTwo } from '../components/landing-page-two/landing-page-two';
import { GestionUserCoteAdminComponent } from '../pages/admin/gestion-user-cote-admin/gestion-user-cote-admin.component';
import { ConfigurationDuProjet } from '../pages/users/configuration-du-projet/configuration-du-projet';
import { CreerTache } from '../pages/users/creer-tache/creer-tache';

import { DashboardAdmin } from '../pages/admin/dashboard-admin/dashboard-admin';
import { ViewProjectsComponent } from '../pages/users/view-projects/view-projects';



@Component({
  selector: 'app-root',
  standalone: true,

imports: [
    ///ConfigurationDuProjet,
    //CreerTache,
    // DashboardComponent,
    //Projects, 
   ViewProjectsComponent



  imports: [RouterOutlet, AjoutEquipe, ConfigurationDuProjet, CreerTache, DashboardComponent,ViewProjectsComponent, DashboardAdmin],


  templateUrl: './app.component.html',
  providers: [CookieService, JoinProject],
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private cookieService = inject(CookieService);
  private joinProjectService = inject(JoinProject);

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
    const projectId = data.projectId ;
    const profilId = data.profilId ;
  }

}
