import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UploadFileComponent } from '../../../shared/upload-file/upload-file.component';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ButtonModule,
    ProgressBarModule,
    ToastModule,
    UploadFileComponent
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

  onFileSelected(file: File) {
    this.formData.file = file;
  }

  cancel() {
    this.formData = {
      title: '',
      domain: '',
      customDomain: '',
      description: '',
      file: null
    };
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


    // 🔁 futur appel backend ici
  }
}
