
import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PopUp } from '../shared/reusablesComponents/pop-up/pop-up';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AjoutEquipe } from '../pages/users/ajout-equipe/ajout-equipe';
import { DetailProjetComponent } from '../pages/users/detail-projet/detail-projet.component';
import { DashboardAdmin } from '../pages/admin/dashboard-admin/dashboard-admin';
import { ProfileComponent } from '../pages/users/profil/profil.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-root',
  standalone: true,

  providers: [MessageService, ConfirmationService],


  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    AjoutEquipe,
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    RippleModule,
    DetailProjetComponent,
    DashboardAdmin,
    ProfileComponent
  ],


  templateUrl: './app.component.html',
  // providers: [CookieService],
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