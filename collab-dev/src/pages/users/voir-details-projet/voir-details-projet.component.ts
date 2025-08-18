
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// On ne va pas utiliser l'ancienne interface IProject car la structure backend est différente



@Component({
  imports:[CommonModule, FormsModule],
  selector: 'app-voir-details-projet',
  templateUrl: './voir-details-projet.component.html',
  styleUrls: ['./voir-details-projet.component.css']
})
export class VoirDetailsProjetComponent {

  project: any = null;
  loading = true;
  errorMessage = '';
  showCommentModal = false;
  showMemberModal = false;
  newComment = '';
  comments: any[] = [];


  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
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
    this.loading = true;
    this.projectService.getProjectDetails(projectId).subscribe({
      next: (res) => {
        // On mappe explicitement les champs pour correspondre à la structure backend
        const data = res.data;
        this.project = {
          id: data.id,
          title: data.title,
          description: data.description,
          domain: data.domain,
          specification: data.specification,
          author: data.author, // objet complet
          manager: data.managerId, // objet complet
          status: data.status,
          level: data.level,
          githubLink: data.githubLink,
          tasks: data.tasks,
          members: data.members,
          pendingProfiles: data.pendingProfiles,
          coins: data.coins,
          comments: data.comments,
          contributionRequests: data.contributionRequests,
          createdDate: data.createdDate
        };
        this.comments = data.comments || [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = "Erreur lors du chargement du projet.";
        this.loading = false;
      }
    });
  }

  toggleCommentModal() {
    this.showCommentModal = !this.showCommentModal;
  }

  toggleMemberModal() {
    this.showMemberModal = !this.showMemberModal;
  }

  addComment() {
    if (this.newComment.trim()) {
      // TODO: Envoyer le commentaire au backend si nécessaire
      this.comments.unshift({
        author: 'Vous', // À remplacer par le nom de l'utilisateur connecté
        text: this.newComment,
        date: new Date()
      });
      this.newComment = '';
    }
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}

    