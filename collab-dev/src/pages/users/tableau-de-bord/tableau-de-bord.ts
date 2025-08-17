import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ProjectService } from '../../../core/services/project.service';
@Component({
  selector: 'app-tableau-de-bord',
  imports: [CommonModule],
  templateUrl: './tableau-de-bord.html',
  styleUrl: './tableau-de-bord.css'
})
export class TableauDeBord implements OnInit {
  userProjects: any[] = [];
  totalContributions: number = 0;
  totalCoins: number = 0;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    const userId = 1; // À remplacer par l’ID réel de l’utilisateur connecté

    this.projectService.getProjectsByUser(userId).subscribe({
      next: (projects) => {
        this.userProjects = projects;
        // Calcul des coins
        this.totalCoins = Array.isArray(projects)
          ? projects.reduce((sum, p) => sum + (p.coins || 0), 0)
          : 0;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets :', err);
      }
    });

    this.projectService.getContributionsByUser(userId).subscribe({
      next: (contributions) => {
        this.totalContributions = Array.isArray(contributions) ? contributions.length : 0;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contributions :', err);
      }
    });

    this.createProfileChart();
  }

  /**
   * Crée et affiche le graphique en beignet pour les statistiques des profils.
   */
  createProfileChart(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const ctx = document.getElementById('profileChart') as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Designer', 'Développeur', 'Manager'],
            datasets: [{
              data: [90, 30, 30],
              backgroundColor: [
                '#3B82F6', // blue-500
                '#8B5CF6', // purple-500
                '#EF4444'  // red-500
              ],
              borderWidth: 0,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: true
              }
            }
          }
        });
      }
    }
  }

  /**
   * Extrait les initiales d'un nom pour l'affichage de l'avatar.
   * @param name Le nom complet.
   * @returns Les initiales en majuscules.
   */
  getInitials(name: string): string {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  }

}
