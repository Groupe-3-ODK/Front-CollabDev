import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-commentaire2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commentaire2.html',
  styleUrl: './commentaire2.css'
})
export class Commentaire2  implements OnInit{
  


  // Propriété pour contrôler la visibilité du composant
  isClosed: boolean = false;

  // Propriétés pour gérer les commentaires et les réponses
  comments: any[] = [];
  newCommentText: string = '';
  replyingToCommentId: number | null = null;
  currentUser = 'You'; // Simuler un utilisateur connecté

  constructor() { }

  ngOnInit(): void {
    // Simuler le chargement des commentaires existants
    this.comments = [
      {
        id: 1,
        author: 'Aïssatou Coulibaly',
        text: 'lorem ipsum lorem ipsum lorem ipsum',
        replies: []
      },
      {
        id: 2,
        author: 'Aïssatou Coulibaly',
        text: 'lorem ipsum lorem ipsum lorem ipsum',
        replies: []
      }
    ];
  }

  /**
   * Ajoute un nouveau commentaire ou une réponse.
   */
  addComment(): void {
    if (!this.newCommentText.trim()) {
      return;
    }

    if (this.replyingToCommentId !== null) {
      // Si on répond à un commentaire existant
      const parentComment = this.comments.find(c => c.id === this.replyingToCommentId);
      if (parentComment) {
        parentComment.replies.push({
          id: Date.now(), // Utilisation d'un ID unique
          author: this.currentUser,
          text: this.newCommentText.trim()
        });
      }
      this.replyingToCommentId = null; // Réinitialiser l'état de réponse
    } else {
      // Sinon, ajouter un nouveau commentaire de niveau supérieur
      this.comments.push({
        id: Date.now(), // Utilisation d'un ID unique
        author: this.currentUser,
        text: this.newCommentText.trim(),
        replies: []
      });
    }

    this.newCommentText = ''; // Vider l'input
  }

  /**
   * Active le mode "répondre à un commentaire".
   * @param commentId ID du commentaire parent.
   */
  replyToComment(commentId: number): void {
    this.replyingToCommentId = commentId;
    this.newCommentText = `@${this.comments.find(c => c.id === commentId).author} `;
  }

  /**
   * Extrait les initiales de l'auteur pour l'avatar.
   * @param name Nom de l'auteur.
   * @returns Les initiales.
   */
  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  /**
   * Ferme la fenêtre de commentaires en basculant la propriété `isClosed`.
   */
  closeComments(): void {
    this.isClosed = true;
    console.log('Fermeture de la fenêtre des commentaires.');
  }
}
