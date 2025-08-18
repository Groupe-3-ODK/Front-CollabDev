import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { Task } from '../../../core/services/task';
import { UsersService } from '../../../core/services/users.service';
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
    deadline: '',
  };

  projectId!: number;
  project: any;
  errorMessage: string = '';
  profilId: string = '';

  constructor(
    private taskService: Task,
    private route: ActivatedRoute,
    private projetService: ProjectService,
    private userService: UsersService
  ) {}
  membersWithPseudo: any;
  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;

    this.projetService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.project = response.data;

        const requests = this.project.members.map((profil: any) =>
          this.userService.getUserById(profil.userId).pipe(
            map((user: any) => ({
              profilId: profil.id,
              pseudo: user.data.speudo,
            }))
          )
        );

        forkJoin(requests).subscribe({
          next: (members) => {
            this.membersWithPseudo = members;
            console.log(' Liste complète:', this.membersWithPseudo);
          },
          error: (err) =>
            console.error('Erreur lors du chargement des pseudos', err),
        });
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.log('Erreur lors de la récupération du projet', error);
      },
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  submitTask(): void {
    if (this.isFormValid()) {
      const taskDto = {
        projectId: this.projectId,
        task: {
          taskName: this.task.name,
          description: this.task.description,
          deadLine: formatDate(this.task.deadline, 'yyyy-MM-dd', 'en-US'), // Format ISO
        },
      };

      // Étape 1 : Créer la tâche
      this.taskService.createTasks(taskDto).subscribe({
        next: (response) => {
          const createdTask = response.data;
          const taskId = createdTask.id;

          console.log('✅ Tâche créée :', createdTask);

          // Étape 2 : Assigner la tâche
          const assignDTO = {
            projectId: this.projectId,
            profilCibleId: this.profilId,
            taskId: taskId,
          };

          this.taskService.assignTasksToProfil(assignDTO, 0).subscribe({
            next: (assignResponse) => {
              console.log('✅ Tâche assignée :', assignResponse);
              alert('Tâche créée et assignée avec succès !');
              this.resetForm();
            },
            error: (error) => {
              console.error("❌ Erreur lors de l'assignation :", error);
              alert("Erreur lors de l'assignation de la tâche");
            },
          });
        },
        error: (error) => {
          console.error('❌ Erreur création tâche :', error);
          alert('Erreur lors de la création de la tâche');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  // Vérifie si le formulaire est valide
  isFormValid(): boolean {
    return (
      this.task.name !== '' &&
      this.task.description !== '' &&
      this.task.deadline !== ''
    );
  }

  // Réinitialise le formulaire
  resetForm(): void {
    this.task = {
      name: '',
      description: '',
      deadline: '',
    };
  }

  // onAssigneeChange(event: Event) {
  // const value = (event.target as HTMLSelectElement).value;
  // this.profilId = value;
  //}
}
