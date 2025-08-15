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

  // Réinitialise le formulaire
  resetForm(): void {
    this.task = {
      name: '',
      description: '',
      dueDate: '',
      assignee: ''
    }
  }
}}
