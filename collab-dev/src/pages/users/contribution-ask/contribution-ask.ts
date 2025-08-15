import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from 'express';
import { ProjectService } from '../../../core/services/project.service';
import { Iproject } from '../../../core/interfaces/project';
import { IApiResponse, Project } from '../../../core/interfaces/api-response';

interface PendingProfile {
  id: number;           // id du profil
  userId: number;       // id de l'utilisateur
  pseudo: string;       // pseudo de l'utilisateur
  badge: 'GREEN' | 'RED' | 'YELLOW';
  profilName: 'DESIGNER' | 'DEVELOPER' | 'MANAGER';
}

@Component({
  selector: 'app-contribution-ask',
  imports: [CommonModule, RouterModule],
  templateUrl: './contribution-ask.html',
  styleUrl: './contribution-ask.css',
})
export class ContributionAsk implements OnInit {
  // users: User[] = [
  //   { id: 1, pseudo: 'Aminata', badge: 'green', profile: 'DESIGNNEUR' },
  //   { id: 2, pseudo: 'Mariam', badge: 'green', profile: 'DEVELOPPEUR' },
  //   { id: 3, pseudo: 'Rose', badge: 'red', profile: 'DESIGNNEUR' },
  //   { id: 4, pseudo: 'Pseudo', badge: 'red', profile: 'DEVELOPPEUR' },
  //   { id: 5, pseudo: 'Pseudo', badge: 'yellow', profile: 'DEVELOPPEUR' },
  //   { id: 6, pseudo: 'Pseudo', badge: 'green', profile: 'DEVELOPPEUR' },
  //   { id: 7, pseudo: 'Pseudo', badge: 'yellow', profile: 'DESIGNNEUR' },
  //   { id: 8, pseudo: 'Pseudo', badge: 'yellow', profile: 'DESIGNNEUR' },
  // ];

  projectId!: number; 
  pendingUsers: PendingProfile[] = [];

  constructor(
    private projectService: ProjectService, 
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = +id; // conversion string -> number
        this.loadPendingUsers();
      }
    });
  }

  loadPendingUsers() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        const project: Project = res.data as unknown as Project;
        this.pendingUsers = project.pendingProfiles.map((profil: any) => ({
            id: profil.id,
            userId: profil.userId,
            pseudo: profil.speudo || 'Inconnu',
            badge: profil.badge.toLowerCase() as 'GREEN' | 'RED' | 'YELLOW',
            profilName: profil.profilName as 'DESIGNER' | 'DEVELOPER' | 'MANAGER'
        }));
      },
      error: (err) => console.error('Erreur récupération profils en attente', err)
    });
  }

  // acceptUser(userId: number) {
  //   console.log(`User with ID ${userId} accepted.`);
  //   // Add logic here to remove the user from the list or update their status
  //   this.users = this.users.filter((user) => user.id !== userId);
  // }

  acceptUser(profilId: number) {
  this.projectService.selectProfilAndAddToProject(profilId, this.projectId)
    .subscribe({
      next: () => {
        // retirer de la liste des pendingUsers
        this.pendingUsers = this.pendingUsers.filter(u => u.id !== profilId);
      },
      error: (err) => console.error(err)
    });
  }

  rejectUser(profilId: number) {
  // retirer de la liste des pendingUsers
  this.pendingUsers = this.pendingUsers.filter(u => u.id !== profilId);
}

  // rejectUser(userId: number) {
  //   console.log(`User with ID ${userId} rejected.`);
  //   // Add logic here to remove the user from the list or update their status
  //   this.users = this.users.filter((user) => user.id !== userId);
  // }
}
