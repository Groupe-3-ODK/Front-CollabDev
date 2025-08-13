import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { IApiResponse } from '../../../core/interfaces/api-response';

interface User {
  id: number;
  pseudo: string;
  level: string;
  coins: number;
  validatedProjects: number;
  profilName: 'DESIGNER' | 'DEVELOPER'; // champ réel API
}

interface UserData {
  designers: User[];
  developers: User[];
}

@Component({
  selector: 'app-contribution-ask',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contribution-ask.html',
  styleUrls: ['./contribution-ask.css'],
})
export class ContributionAsk implements OnInit {
  private projectService = inject(ProjectService);

  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
  this.projectService.getProjectRecommendations(2).subscribe({
    next: (res: IApiResponse) => {
      const rawData = res.data as unknown;

        // On cast localement en objet qui contient designers et developers (optionnellement)
        const data = rawData as { designers?: User[]; developers?: User[] };

        // On concatène les deux tableaux s'ils existent
        this.users = [
          ...(data.designers ?? []),
          ...(data.developers ?? [])
        ];
    },
    error: (err) => {
      console.error('Erreur chargement utilisateurs', err);
    },
  });
}

  acceptUser(userId: number) {
    console.log(`User with ID ${userId} accepted.`);
    this.users = this.users.filter(user => user.id !== userId);
  }

  rejectUser(userId: number) {
    console.log(`User with ID ${userId} rejected.`);
    this.users = this.users.filter(user => user.id !== userId);
  }

  getBadgeColor(level: string): string {
  switch(level.toLowerCase()) {
    case 'beginner': return 'text-green-500';
    case 'intermediate': return 'text-yellow-500';
    case 'advanced': return 'text-red-500';
    default: return 'text-gray-500';
  }
}

loadPendingContributors() {
  this.projectService.getPendingContributors(1).subscribe({
    next: (res) => {
      const rawData = res.data as unknown;

        // On cast localement en objet qui contient designers et developers (optionnellement)
        const data = rawData as { designers?: User[]; developers?: User[] };

        // On concatène les deux tableaux s'ils existent
        this.users = [
          ...(data.designers ?? []),
          ...(data.developers ?? [])
        ];
    },
    error: (err) => console.error('Erreur chargement contributeurs', err)
  });
}

}
