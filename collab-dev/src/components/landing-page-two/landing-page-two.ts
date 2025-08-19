import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
      name: 'Fatoumata Diawara',
      role: 'Développeur Full-stack',
      photoUrl: 'fatoumata.JPG',
      linkedinUrl: 'https://www.linkedin.com/in/douking95/',
      githubUrl: 'https://github.com/elinkalika223',
    },
    {
      name: 'Yacouba Sanogo',
      role: 'Chef de projet',
      photoUrl: 'https://i.pravatar.cc/100?img=2',
      linkedinUrl: 'https://www.linkedin.com/in/douking95/',
      githubUrl: 'https://github.com/Yacouba-Sanogo',
    },
    {
      name: 'Aissata Coulibaly',
      role: 'Designer UX/UI',
      photoUrl: 'https://i.pravatar.cc/100?img=3',
      linkedinUrl: 'https://www.linkedin.com/in/douking95/',
      githubUrl: 'https://github.com/Aissatou007',
    },
        {
      name: 'Mohamed Touré',
      role: 'Développeur full-stack',
      photoUrl: 'https://i.pravatar.cc/100?img=3',
      linkedinUrl: 'https://www.linkedin.com/in/douking95/',
      githubUrl: 'https://github.com/berrahtech',
    },    {
      name: 'Seydou Dembélé',
      role: 'Développeur full-stack',
      photoUrl: 'https://i.pravatar.cc/100?img=3',
      linkedinUrl: 'https://www.linkedin.com/in/douking95/',
      githubUrl: 'https://github.com/Aissatou007',
    },    {
      name: 'Sékou Keita',
      role: 'Développeur full-stack',
      photoUrl: 'https://i.pravatar.cc/100?img=3',
      linkedinUrl: 'https://www.linkedin.com/in/douking95/',
      githubUrl: 'https://github.com/Aissatou007',
    },    {
      name: 'Hamaza Sanmo',
      role: 'Développeur full-stack',
      photoUrl: 'https://i.pravatar.cc/100?img=3',
      linkedinUrl: 'https://www.linkedin.com/in/douking95/',
      githubUrl: 'https://github.com/Aissatou007',
    },
  ];

  contact = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private router: Router) {}

  onLogin(): void {
    this.router.navigate(['/login']);
  }
  onSignup(): void {
    this.router.navigate(['/signup']);
  }

  onSubmit(): void {
    console.log('Formulaire soumis !', this.contact);
    alert(`Merci pour votre message, ${this.contact.name} !`);
  }
}
