import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../../core/interfaces/commentP';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  imports:[CommonModule, FormsModule],
  selector: 'app-voir-details-projet',
  templateUrl: './voir-details-projet.component.html',
  styleUrls: ['./voir-details-projet.component.css']
})
export class VoirDetailsProjetComponent {
  project?: IProject;
  loading = true;
  errorMessage = '';
  showCommentModal = false;
  showMemberModal = false;
  newComment = '';

  defaultMembers = [
    { name: 'Fatoumata Diawara' },
    { name: 'Modibo Sangaré' },
    { name: 'Hamza Sanmo' },
    { name: 'Aichatou Coulibaly' },
    { name: 'Seydou Dembele' },
    { name: 'Yacouba Sanogo' },
    { name: 'Sekou Keita' },
    { name: 'Elinka Lika' }
  ];

  comments = [
    {
      author: 'Fatoumata Diawara',
      text: 'Le développement du module Angular avance bien, je pense qu\'on pourra terminer cette semaine.',
      date: new Date('2025-08-15T10:30:00')
    },
    {
      author: 'Modibo Sangaré',
      text: 'J\'ai rencontré un problème avec l\'API Spring Boot, je dois investiguer.',
      date: new Date('2025-08-14T16:45:00')
    }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      this.loadProjectDetails(projectId);
    });
  }
  

  

  userDateCreation(date: Date): string {
    const now = new Date();
    const creationDate = new Date(date);

    const diffMs = now.getTime() - creationDate.getTime(); // différence en millisecondes
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffH = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffH / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) return `il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`;
    if (diffMonths > 0) return `il y a ${diffMonths} mois`;
    if (diffDays > 0) return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    if (diffH > 0) return `il y a ${diffH} heure${diffH > 1 ? 's' : ''}`;
    if (diffMin > 0) return `il y a ${diffMin} minute${diffMin > 1 ? 's' : ''}`;
    return `il y a quelques secondes`;
  }

  loadProjectDetails(projectId: number) {
    // Simulation de chargement de données
    setTimeout(() => {
      this.project = {
        id: projectId,
        name: 'ALP',
        description: 'Une app application web innovante conçue pour optimiser le suivi, la planification et la gestion collaborative de projets en temps réel.',
        status: 'En cours',
        level: 'INTERMEDIAIRE',
        progress: 50,
        creationDate: '6 Août 2025',
        currentPhase: 'En cours',
        technologies: ['Angular', 'Typescript', 'Spring boot'],
        owner: {
          name: 'Fatoumata Diawara',
          projectsCount: 20,
          memberSince: '2024'
        },
        members: this.defaultMembers
      };
      this.loading = false;
    }, 1000);
  }

  toggleCommentModal() {
    this.showCommentModal = !this.showCommentModal;
  }

  toggleMemberModal() {
    this.showMemberModal = !this.showMemberModal;
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.unshift({
        author: 'Vous', // À remplacer par le nom de l'utilisateur connecté
        text: this.newComment,
        date: new Date()
      });
      this.newComment = '';
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
