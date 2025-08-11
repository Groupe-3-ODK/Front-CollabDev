import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importez le CommonModule
import { FormsModule } from '@angular/forms'; // Importez le FormsModule

@Component({
  selector: 'app-creer-tache',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creer-tache.html',
  styleUrl: './creer-tache.css'
})
export class CreerTache {
  
  // Propriétés du composant pour la gestion des données du formulaire
  task = {
    name: '',
    description: '',
    deadline: '',
    collaborators: []
  };

  constructor() { }

  // Méthode appelée lorsque l'utilisateur clique sur le bouton "Annuler"
  onCancel(): void {
    // Réinitialise le formulaire à ses valeurs initiales
    this.task = {
      name: '',
      description: '',
      deadline: '',
      collaborators: []
    };
    console.log('Formulaire annulé. Les données ont été réinitialisées.');
  }

  // Méthode appelée lorsque le formulaire est soumis et valide
  onValidate(): void {
    if (this.task.name && this.task.description && this.task.deadline) {
      console.log('Formulaire valide ! Données à envoyer :', this.task);
      // Ici, vous pouvez ajouter la logique pour envoyer les données à votre backend.
      // Une fois l'opération terminée, vous pouvez réinitialiser le formulaire.
      this.onCancel();
    } else {
      console.log('Le formulaire est invalide. Veuillez remplir tous les champs requis.');
    }
  }

}
