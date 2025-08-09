import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page-two',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page-two.html',
  styleUrl: './landing-page-two.css',
})
export class LandingPageTwo {
  title = 'collabdev-landing-page';

  // Données pour la section de l'équipe
  teamMembers = [
    {
      name: 'John Doe',
      role: 'Développeur Full-stack',
      photoUrl: 'https://i.pravatar.cc/100?img=1',
      linkedinUrl: 'https://www.linkedin.com/in/johndoe',
      githubUrl: 'https://github.com/johndoe',
    },
    {
      name: 'Jane Smith',
      role: 'Designer UX/UI',
      photoUrl: 'https://i.pravatar.cc/100?img=2',
      linkedinUrl: 'https://www.linkedin.com/in/janesmith',
      githubUrl: 'https://github.com/janesmith',
    },
    {
      name: 'Peter Jones',
      role: 'Chef de projet',
      photoUrl: 'https://i.pravatar.cc/100?img=3',
      linkedinUrl: 'https://www.linkedin.com/in/peterjones',
      githubUrl: 'https://github.com/peterjones',
    },
  ];

  // Modèle de données pour le formulaire de contact
  contact = {
    name: '',
    email: '',
    message: '',
  };

  constructor() {}

  /**
   * Gère les clics sur les boutons de la page.
   * @param buttonName - Nom du bouton cliqué.
   */
  onButtonClick(buttonName: string): void {
    console.log(`Le bouton "${buttonName}" a été cliqué !`);
    alert(`Action pour le bouton : ${buttonName}`);
    // Ici, vous pouvez ajouter une logique de routage ou d'autres actions.
  }

  /**
   * Gère la soumission du formulaire de contact.
   */
  onSubmit(): void {
    console.log('Formulaire soumis !', this.contact);
    alert(`Merci pour votre message, ${this.contact.name} !`);
    // Ici, vous enverriez les données à un service backend
    // pour le traitement (ex: via un service HTTP).
  }
}
