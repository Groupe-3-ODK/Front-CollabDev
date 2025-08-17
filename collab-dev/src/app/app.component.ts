import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AjoutEquipe } from '../pages/users/ajout-equipe/ajout-equipe';
import { DetailProjetComponent } from '../pages/users/detail-projet/detail-projet.component';

@Component({
  selector: 'app-root',
  standalone: true,

  providers: [MessageService, ConfirmationService],


  imports: [
    CommonModule,
    RouterOutlet,
    AjoutEquipe,
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    RippleModule,
    DetailProjetComponent,
  ],


  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
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

  // ---------------------- TOAST ----------------------
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Opération réussie !',
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Voici une information.',
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Attention',
      detail: 'Soyez prudent.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue.',
    });
  }

  // ---------------------- CONFIRM DIALOG ----------------------
  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet élément ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Supprimé',
          detail: "L'élément a été supprimé.",
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Annulé',
          detail: 'Suppression annulée.',
        });
      },
    });
  }
}
