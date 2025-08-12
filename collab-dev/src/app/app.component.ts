import { Component } from '@angular/core';

import { inject, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';
import { AdminFormComponent } from '../pages/users/admin-form/admin-form.component';

import { CookieService } from 'ngx-cookie-service';

import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup';
import { ConfigurationDuProjet } from '../pages/users/configuration-du-projet/configuration-du-projet';
import { CreerTache } from '../pages/users/creer-tache/creer-tache';
import { JoinProject } from '../../service/join-project';
import { Project } from '../core/classes/project';
import { Projects } from "../pages/users/projects/projects";
import { DetailProjetComponent } from "../pages/users/detail-projet/detail-projet.component";
import { SidebarComponent } from "../shared/reusablesComponents/sidebar/sidebar.component";
import { PopUp } from "../shared/reusablesComponents/pop-up/pop-up";
import { ViewProjectsComponent } from "../pages/users/view-projects/view-projects";

@Component({
  selector: 'app-root',
  standalone: true,
imports: [
    ///ConfigurationDuProjet,
    //CreerTache,
    // DashboardComponent,
    //Projects, 
   ViewProjectsComponent

],
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
