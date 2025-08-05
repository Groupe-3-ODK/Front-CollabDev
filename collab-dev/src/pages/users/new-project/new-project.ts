import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ButtonModule,
    ProgressBarModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './new-project.html',
  styleUrls: ['./new-project.css']
})
export class NewProjectComponent {
  domains = [
    'E-commerce & Marketplace',
    'Éducation & E-learning',
    'Santé & Bien-être',
    'Finance & Comptabilité',
    'Agritech & Environnement',
    'Réseaux sociaux & Communication',
    'Logistique & Transport',
    'Tourisme & Loisirs',
    'IA & Automatisation',
    'Gestion d’entreprise (ERP/CRM)',
    'Autre'
  ];

  formData = {
    title: '',
    domain: '',
    customDomain: '',
    description: '',
    file: null as File | null
  };

  selectedFiles: File[] = [];

  onSelect(event: any) {
  const file = event.target.files?.[0];
  if (file) {
    this.formData.file = file;
  }
}

handleUpload() {
  if (this.formData.file) {
    console.log('Fichier à téléverser :', this.formData.file.name);
    // 🔁 ici, tu pourras appeler ton backend (via HttpClient) plus tard
  } else {
    console.warn('Aucun fichier sélectionné.');
  }
}


  submitForm() {
    const finalDomain =
      this.formData.domain === 'Autre'
        ? this.formData.customDomain
        : this.formData.domain;

    console.log('Projet soumis :', {
      titre: this.formData.title,
      domaine: finalDomain,
      description: this.formData.description,
      fichier: this.formData.file?.name ?? 'Aucun fichier joint'
    });

    // Tu peux ici envoyer les données à ton backend
  }
}
