import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto'
@Component({
  selector: 'app-tableau-de-bord',
  imports: [CommonModule],
  templateUrl: './tableau-de-bord.html',
  styleUrl: './tableau-de-bord.css'
})
export class TableauDeBord implements OnInit {
  

  // Données des projets à afficher
  projects = [
    {
      title: 'ALP',
      description: 'Api de gestion de projets collaboratifs',
      tags: ['Angular', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: ['Aïssatou', 'User2', 'User3']
    },
    {
      title: 'ALP',
      description: 'Api de gestion de projets collaboratifs',
      tags: ['Angular', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: ['Aïssatou', 'User2', 'User3']
    },
    {
      title: 'ALP',
      description: 'Api de gestion de projets collaboratifs',
      tags: ['Angular', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: ['Aïssatou', 'User2', 'User3']
    },
    {
      title: 'ALP',
      description: 'Api de gestion de projets collaboratifs',
      tags: ['Angular', 'Angular', 'TypeScript'],
      progress: 70,
      collaborators: ['Aïssatou', 'User2', 'User3']
    },
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialise le graphique à l'ouverture du composant
    this.createProfileChart();
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

  /**
   * Extrait les initiales d'un nom pour l'affichage de l'avatar.
   * @param name Le nom complet.
   * @returns Les initiales en majuscules.
   */
  getInitials(name: string): string {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  }

}
