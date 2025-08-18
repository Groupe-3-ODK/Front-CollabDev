// Property and logic moved inside class and ngOnInit
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { CookieService } from 'ngx-cookie-service';
import { ProjectService } from '../../../core/services/project.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-second-dashboard',
  imports: [CommonModule],
  templateUrl: './second-dashboard.html',
  styleUrl: './second-dashboard.css',
  providers: [CookieService],
})
export class SecondDashboard {
  coinsDev: number = 0;
  coinsDesign: number = 0;
  coinsManager: number = 0;
  coinsTotal: number = 0;
  createdProjectsCount: number = 0;
  projectsDesigner: number = 0;
  projectsDeveloper: number = 0;
  projectsManager: number = 0;
  contributions: any = [];
  private cookieService = inject(CookieService);
  public currentUser: any = null;
  userId: number = 0;
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  projetsDesigner: any[] = [];
  projetsDeveloper: any[] = [];
  projetsManager: any[] = [];
  projetsEnCours: any = [];
  pendingContributionsCount: number = 0;

  projects = [
    {
      title: 'ALP',
      description: 'Api de gestion de projets collaboratifs',
      tags: ['Angular', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: ['Aïssatou', 'User2', 'User3'],
    },
    {
      title: 'ALP',
      description: 'Api de gestion de projets collaboratifs',
      tags: ['Angular', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: ['Aïssatou', 'User2', 'User3'],
    },
    {
      description: 'Api de gestion de projets collaboratifs',
      tags: ['Angular', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: ['Aïssatou', 'User2', 'User3'],
    },
    {
      title: 'ALP',
      description: 'Api de gestion de projets collaboratifs',
      tags: ['Angular', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: ['Aïssatou', 'User2', 'User3'],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Récupère les coins par profil et total via TaskService
    if (this.currentUser && this.userId) {
      this.taskService.getDeveloperCoins(this.userId).subscribe({
        next: (res: any) => { this.coinsDev = res.data || 0; },
        error: () => { this.coinsDev = 0; }
      });
      this.taskService.getDesignerCoins(this.userId).subscribe({
        next: (res: any) => { this.coinsDesign = res.data || 0; },
        error: () => { this.coinsDesign = 0; }
      });
      this.taskService.getManagerCoins(this.userId).subscribe({
        next: (res: any) => { this.coinsManager = res.data || 0; },
        error: () => { this.coinsManager = 0; }
      });
      this.taskService.getTotalCoins(this.userId).subscribe({
        next: (res: any) => { this.coinsTotal = res.data || 0; },
        error: () => { this.coinsTotal = 0; }
      });
    }
    const cookieValue = this.cookieService.get('currentUser');
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;
    if (this.currentUser) {
      this.userId = this.currentUser.id;
      // Récupère les demandes de contributions en attente
      if (this.projectService && this.userId) {
        this.projectService.getPendingProjectsByUser(this.userId).subscribe({
          next: (res: any) => {
            this.pendingContributionsCount = res.data?.length || 0;
          },
          error: (err: any) => {
            this.pendingContributionsCount = 0;
          }
        });
        // Récupère le nombre de projets créés par l'utilisateur
        this.projectService.countProjectsByAuthor(this.userId).subscribe({
          next: (res: any) => {
            this.createdProjectsCount = res.data || 0;
          },
          error: (err: any) => {
            this.createdProjectsCount = 0;
          }
        });
      }
    }
    this.projectService.getUserContributions(this.userId).subscribe({
      next: (res) => {
        this.contributions = res.data;
        // Calcul du nombre de projets par rôle pour l'utilisateur connecté
        this.projectsDesigner = 0;
        this.projectsDeveloper = 0;
        this.projectsManager = 0;
        this.contributions.forEach((project: any) => {
          if (project.members && Array.isArray(project.members)) {
            project.members.forEach((member: any) => {
              if (member.userId === this.userId) {
                if (member.profilName === 'DESIGNER') {
                  this.projectsDesigner++;
                }
                if (member.profilName === 'DEVELOPER') {
                  this.projectsDeveloper++;
                }
                if (member.profilName === 'MANAGER') {
                  this.projectsManager++;
                }
              }
            });
          }
        });
        // Appliquer le filtre
        this.projetsEnCours = this.filterProjetsEnCours(this.contributions);
        // Créer le graphique APRÈS avoir les vraies données
        setTimeout(() => this.createProfileChart(), 0);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  // Méthode de filtrage
filterProjetsEnCours(contributions: any[]): any[] {
  return contributions.filter(projet => 
    projet.status === 'TODO' || projet.status === 'IN_PROGRESS'
  );
}

  /**
   * Crée et affiche le graphique en beignet pour les statistiques des profils.
   */
  createProfileChart(): void {
    const ctx = document.getElementById('profileChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Designer', 'Développeur', 'Manager'],
          datasets: [
            {
              data: [
                this.projectsDesigner,
                this.projectsDeveloper,
                this.projectsManager
              ],
              backgroundColor: [
                '#3B82F6', // blue-500
                '#8B5CF6', // purple-500
                '#EF4444', // red-500
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '80%',
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }
  }

  /**
   * Extrait les initiales d'un nom pour l'affichage de l'avatar.
   * @param name Le nom complet.
   * @returns Les initiales en majuscules.
   */
  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();
  }
}
