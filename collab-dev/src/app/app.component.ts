<<<<<<< HEAD

import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PopUp } from '../shared/reusablesComponents/pop-up/pop-up';
import { RouterOutlet } from '@angular/router';
import { ContributionAsk } from '../pages/users/contribution-ask/contribution-ask';


=======
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LandingPageTwo } from '../components/landing-page-two/landing-page-two';
import { AdminFormComponent } from '../pages/users/admin-form/admin-form.component';
>>>>>>> 645f3828500db29118f6734b10aebcf284e73692

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [PopUp, RouterOutlet, ContributionAsk],
=======
  imports: [CommonModule, RouterOutlet, AdminFormComponent, LandingPageTwo],

>>>>>>> 645f3828500db29118f6734b10aebcf284e73692
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
<<<<<<< HEAD
=======
  }
  //------------------------------------------------------
  showModal = true;

  onSubmit(profile: string) {
    console.log('Profil choisi :', profile);
    this.showModal = false; // ferme aussi après soumission
>>>>>>> 645f3828500db29118f6734b10aebcf284e73692
  }
}