import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IApiResponse } from '../../../core/interfaces/api-response';
import { ProjectService } from '../../../core/services/project.service';
import { UsersService } from '../../../core/services/users.service';
import { forkJoin, map } from 'rxjs';

interface Profile {
  id: number;
  userId: number;
  pseudo: string;
  level: string;
  coins: number;
  validatedProjects: number;
  badge: string;
  profilName: 'DESIGNER' | 'DEVELOPER' | 'MANAGER';
  taskIds: number[];
  requestedProjectIds: number[];
  createdDate: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  members: Profile[];
  pendingProfiles: Profile[];
  // ... autres champs du projet
}

enum UserLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

interface RecommendedUser {
  id: number;
  pseudo: string;
  level: UserLevel;
  coins: number;
  validatedProjects: number;
  profilName: 'DESIGNER' | 'DEVELOPER';
}

interface RecommendationResponse {
  designers: RecommendedUser[];
  developers: RecommendedUser[];
}

@Component({
  selector: 'app-add-team',
  imports: [CommonModule, RouterModule],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
})
export class AddTeam implements OnInit {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);

  projectId!: number;
  project!: Project;
  pendingUsers: Profile[] = [];
  recommendedUsers: RecommendedUser[] = [];
  activeTab: 'pending' | 'recommendations' = 'pending';
  isLoading = false;
  membersWithPseudo: any;

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProjectDetails();
    this.loadRecommendations();
  }

  loadProjectDetails() {
    this.isLoading = true;
    this.projectService.getProjectDetails(this.projectId).subscribe({
      next: (res: IApiResponse) => {
        this.project = res.data as unknown as Project;
        this.pendingUsers = [...this.project.pendingProfiles];
        this.isLoading = false;
        console.log(this.pendingUsers);
        const request = this.pendingUsers.map((profil: any) =>
          this.userService.getUserById(profil.userId).pipe(
            map((user: any) => ({
              profilId: profil.id,
              pseudo: user.data.speudo,
            }))
          )
        );
        forkJoin(request).subscribe({
          next: (members) => {
            this.membersWithPseudo = members;
            console.log(' Liste complète:', this.membersWithPseudo);
          },
          error: (err) =>
            console.error('Erreur lors du chargement des pseudos', err),
        });
      },
      error: (err) => {
        console.error('Erreur chargement projet', err);
        this.isLoading = false;
      }
    });
  }

  loadRecommendations() {
    this.isLoading = true;
    this.projectService.getProjectRecommendations(this.projectId).subscribe({
      next: (res: IApiResponse) => {
        const data = res.data as unknown as RecommendationResponse;
        this.recommendedUsers = [...data.designers, ...data.developers]
          .sort((a, b) => this.calculateScore(b) - this.calculateScore(a));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur recommandations', err);
        this.isLoading = false;
      }
    });
  }

  calculateScore(user: RecommendedUser): number {
    const levelWeights = {
      'BEGINNER': 1,
      'INTERMEDIATE': 2,
      'ADVANCED': 3
    };

    const levelScore = levelWeights[user.level] || 0;
    return (levelScore * 0.5) + (user.coins * 0.3) + (user.validatedProjects * 0.2);
  }

  acceptUser(profileId: number) {
    this.isLoading = true;
    this.projectService.selectProfilAndAddToProject(profileId, this.projectId).subscribe({
      next: () => {
        const acceptedUser = this.pendingUsers.find(u => u.id === profileId);
        if (acceptedUser) {
          this.project.members.push(acceptedUser);
          this.pendingUsers = this.pendingUsers.filter(u => u.id !== profileId);
          this.project.pendingProfiles = this.pendingUsers;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur acceptation', err);
        this.isLoading = false;
      }
    });
  }

  // rejectUser(profileId: number) {
  //   this.isLoading = true;
  //   this.projectService.rejectContributor(profileId, this.projectId).subscribe({
  //     next: () => {
  //       this.pendingUsers = this.pendingUsers.filter(u => u.id !== profileId);
  //       this.project.pendingProfiles = this.pendingUsers;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Erreur rejet', err);
  //       this.isLoading = false;
  //     }
  //   });
  // }

  getBadgeColor(level: string): string {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }

  switchTab(tab: 'pending' | 'recommendations') {
    this.activeTab = tab;
  }

  // loadPendingContributors() {
  //   this.projectService.getPendingContributors(1).subscribe({
  //     next: (res) => {
  //       const rawData = res.data as unknown;

  //       // On cast localement en objet qui contient designers et developers (optionnellement)
  //       const data = rawData as { designers?: User[]; developers?: User[] };

  //       // On concatène les deux tableaux s'ils existent
  //       this.users = [...(data.designers ?? []), ...(data.developers ?? [])];
  //     },
  //     error: (err) => console.error('Erreur chargement contributeurs', err),
  //   });
  // }
}