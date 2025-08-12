import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importez le CommonModule
import { FormsModule } from '@angular/forms'; // Importez le FormsModule
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-configuration-du-projet',
    standalone: true,
  imports: [CommonModule, FormsModule], // Ajoutez-les ici,
  templateUrl: './configuration-du-projet.html',
  styleUrl: './configuration-du-projet.css'
})
export class ConfigurationDuProjet implements OnInit {

  // Propriétés du formulaire
  projectData = {
    githubLink: '',
    projectLevel: '',
    deadline: '',
    fileName: ''
  };

  // État de la validation du formulaire
  isFormValid = false;
  
  // Données pour la progression et les onglets
  completedSteps = 0;
  totalSteps = 4;
  selectedLevel: string | null = null;
  tabs = [
    { 
      label: 'Lien du dépôt GitHub', 
      iconPath: 'M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.799 8.205 11.385.6.11.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.727-4.043-1.609-4.043-1.609-.547-1.385-1.332-1.755-1.332-1.755-1.09-.745.082-.729.082-.729 1.205.085 1.838 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.493.998.109-.775.419-1.305.762-1.605-2.665-.3-5.465-1.332-5.465-5.93 0-1.31.465-2.385 1.233-3.226-.124-.3-.535-1.524.117-3.176 0 0 1.006-.322 3.3-.997 1.05-.285 2.15-.427 3.25-.427s2.2.142 3.25.427c2.294.675 3.3 0 3.3 0 .652 1.652.241 2.876.117 3.176.768.841 1.233 1.916 1.233 3.226 0 4.61-2.804 5.625-5.474 5.922.429.371.815 1.102.815 2.222 0 1.609-.015 2.898-.015 3.284 0 .322.21.692.825.577C20.565 21.799 24 17.302 24 12c0-6.627-5.373-12-12-12z',
      completed: false 
    },
    { 
      label: 'Niveau du projet', 
      iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM16 16.5c0 .28-.22.5-.5.5h-9c-.28 0-.5-.22-.5-.5v-9c0-.28.22-.5.5-.5h9c.28 0 .5.22.5.5v9zM15 8.5h-7v-3h7v3z',
      completed: false
    },
    { 
      label: 'Date limite', 
      iconPath: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z',
      completed: false 
    },
    { 
      label: 'Cahier de charge', 
      iconPath: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-3 9H9V9h2v2zm-2 2h4v-2h-4v2zm6 2h-6v-2h6v2zM13 3.5L18.5 9H13V3.5z',
      completed: false 
    }
  ];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.updateValidation();
  }

  /**
   * Sélectionne le niveau du projet et met à jour la validation du formulaire.
   * @param level Le niveau du projet sélectionné ('DEBUTANT', 'INTERMÉDIAIRE', 'AVANCÉ').
   */
  selectLevel(level: string): void {
    this.projectData.projectLevel = level;
    this.selectedLevel = level;
    this.updateValidation();
  }

  /**
   * Gère la sélection d'un fichier et met à jour le nom du fichier dans le modèle.
   * @param event L'événement de changement du champ de fichier.
   */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.projectData.fileName = file.name;
    } else {
      this.projectData.fileName = '';
    }
    this.updateValidation();
  }

  /**
   * Met à jour l'état de validation du formulaire en fonction des champs remplis.
   */
  updateValidation(): void {
    let completed = 0;
    
    // Vérifie le lien GitHub
    if (this.projectData.githubLink) {
      completed++;
      this.tabs[0].completed = true;
    } else {
      this.tabs[0].completed = false;
    }

    // Vérifie le niveau du projet
    if (this.projectData.projectLevel) {
      completed++;
      this.tabs[1].completed = true;
    } else {
      this.tabs[1].completed = false;
    }

    // Vérifie la date limite
    if (this.projectData.deadline) {
      completed++;
      this.tabs[2].completed = true;
    } else {
      this.tabs[2].completed = false;
    }
    
    // Vérifie le fichier
    if (this.projectData.fileName) {
      completed++;
      this.tabs[3].completed = true;
    } else {
      this.tabs[3].completed = false;
    }

    this.completedSteps = completed;
    this.isFormValid = completed === this.totalSteps;
  }

  /**
   * Gère la soumission du formulaire une fois validé.
   */
  onValidate(): void {
    if (this.isFormValid) {
      const project = {
        level: this.projectData.projectLevel,
        githubLink: this.projectData.githubLink,
        specification: this.projectData.fileName 
      };

      const projectId = 1;
      const managerProfilId = 2;

      this.projectService.updateProject(1, project, 1)
        .subscribe({
          next: (res) => {
            console.log('Projet configuré avec succès', res);
          },
          error: (err) => {
            console.error('Erreur lors de la configuration', err);
          }
        });

    } else {
      console.log('Veuillez compléter tous les champs.');
    }
  }
}
  

