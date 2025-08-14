// creer-tache.component.ts
import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from '../../../core/services/project.service';
import { Iproject, taskI } from '../../../core/interfaces/projectI';
import { TaskService } from '../../../core/services/taskService';


import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-creer-tache',
  templateUrl: './creer-tache.html',
  styleUrls: ['./creer-tache.scss'],
  imports :[ FormsModule]
})
export class CreerTacheComponent implements OnInit {
  currentProject!: Iproject;
  taskTitle = '';
  selectedMemberId: number | null = null;
  isLoading = false;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const project = this.projectService.getCurrentProject();
    if (!project) {
      alert("Aucun projet trouvé en session.");
      return;
    }
    this.currentProject = project;
  }

  createAndAssignTask(): void {
    if (!this.taskTitle || !this.selectedMemberId) {
      alert("Veuillez saisir un titre et sélectionner un membre.");
      return;
    }

    this.isLoading = true;

  
    this.taskService.createTask({
      title: this.taskTitle,
      projectId: this.currentProject.id
    }).subscribe({
      next: (task) => {

        //taskData:any = task.data
       
        this.taskService.assignTask(task.id, this.selectedMemberId!).subscribe({
          next: (res) => {
            alert("Tâche créée et assignée avec succès !");
            
            this.isLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
            alert("Une erreur est survenue lors de l'assignation.");
            this.isLoading = false;
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        alert("Une erreur est survenue lors de la création de la tâche.");
        this.isLoading = false;
      }
    });
  }
}
