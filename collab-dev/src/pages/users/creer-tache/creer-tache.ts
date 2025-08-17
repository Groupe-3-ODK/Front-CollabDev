import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../core/services/task';
@Component({
  selector: 'app-creer-tache',
  imports: [CommonModule, FormsModule],
  templateUrl: './creer-tache.html',
  styleUrl: './creer-tache.css',
})
export class CreerTache implements OnInit {
  // Modèle pour la tâche
  task = {
    name: '',
    description: '',
    dueDate: '',
    assignee: '',
  };

  // Exemple de données pour la liste des collaborateurs
  collaborators = [
    { id: '1', name: 'Yacouba Sanogo' },
    { id: '2', name: 'Seydou Dembele' },
    { id: '3', name: 'Sekou Keita ' },
  ];

  projectId!: number;

  constructor(private taskService: Task, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
  }

  // Méthode appelée lors de la soumission du formulaire
  submitTask(): void {
    if (this.isFormValid()) {
      console.log('Tâche soumise :', this.task);
      // Ici, vous pouvez ajouter la logique pour envoyer les données de la tâche à un service API
      alert('Tâche créée avec succès !');
      // Réinitialiser le formulaire
      this.resetForm();
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  // Vérifie si le formulaire est valide
  isFormValid(): boolean {
    return (
      this.task.name !== '' &&
      this.task.description !== '' &&
      this.task.dueDate !== '' &&
      this.task.assignee !== ''
    );
  }

  // Réinitialise le formulaire
  resetForm(): void {
    this.task = {
      name: '',
      description: '',
      dueDate: '',
      assignee: '',
    };
  }
}
