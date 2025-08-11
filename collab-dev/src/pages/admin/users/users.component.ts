import { Component } from '@angular/core';
import { IUser, UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  public users: IUser[] = [];

  constructor(private _userService: UsersService) {
    // Initialisation ou logique spécifique au composant peut être ajoutée ici
  }

  // Méthodes et propriétés spécifiques au composant peuvent être ajoutées ici

  public getUsers(): void {
    this._userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log(
          'Liste des utilisateurs récupérée avec succès:',
          this.users
        );
      },
      complete() {
        console.log('Récupération des utilisateurs terminée');
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des utilisateurs:',
          error
        );
      },
    });
  }
}
