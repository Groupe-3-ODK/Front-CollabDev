import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';

import { Iproject, Profil, taskI, Status } from '../../../core/interfaces/projectI';
import { TaskService } from '../../../core/services/taskService';

@Component({
  selector: 'app-creer-tache',
  templateUrl: './creer-tache.html',
  styleUrls: ['./creer-tache.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CreerTacheComponent implements OnInit {
  currentProject!: Iproject;
  membersWithPseudos: {id: number, pseudo: string}[] = [];
  statusOptions: Status[] = ['TODO', 'IN_PROGRESS', 'DONE', 'VALIDATED'];
  
  task: Omit<taskI, 'id'> = {
    title: '',
    description: '',
    status: 'TODO',
    deadLine: new Date(),
    assignee: undefined,
    projectId: 1
  };

  isLoading = false;
  minDate = new Date().toISOString().split('T')[0];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjectData();
  }

  private loadProjectData(): void {
    const project = this.projectService.getCurrentProject();
    if (!project) {
      this.router.navigate(['/projects']);
      return;
    }
    
    this.currentProject = project;
    this.task.projectId = project.id;

    // Récupération des membres avec leurs pseudos
    this.taskService.getProjectMembersWithPseudos(project.id).subscribe({
      next: (members) => {
        this.membersWithPseudos = members;
      },
      error: (err) => {
        console.error('Erreur chargement membres:', err);
        this.membersWithPseudos = project.members?.map(m => ({
          id: m.id,
          pseudo: m.name // Fallback si l'API ne répond pas
        })) || [];
      }
    });
  }

  createAndAssignTask(): void {
    if (!this.task.title || !this.task.deadLine || this.task.description) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }

    this.isLoading = true;
    const managerId = this.currentProject.managerId.id;

    // Création de la tâche
    this.taskService.createTask(managerId, {
      ...this.task,
      projectId: this.currentProject.id
    } as taskI).subscribe({
      next: (response) => {
        if (this.task.assignee) {
          // Assignation si un membre est sélectionné
          this.taskService.assignTask(response.id, this.task.assignee)
            .subscribe({
              next: () => this.handleSuccess(),
              error: (err) => this.handleError(err)
            });
        } else {
          this.handleSuccess();
        }
      },
      error: (err) => this.handleError(err)
    });
  }

  private handleSuccess(): void {
    alert('Tâche créée' + (this.task.assignee ? ' et assignée' : '') + ' avec succès!');
    this.router.navigate(['/users/voir-details-projet', this.currentProject.id]);
  }

  private handleError(error: any): void {
    console.error('Erreur:', error);
    alert('Erreur lors de la création de la tâche');
    this.isLoading = false;
  }

  cancel(): void {
    this.router.navigate(['/users/voir-details-projet', this.currentProject.id]);
  }
}
