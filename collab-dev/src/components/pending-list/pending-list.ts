import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  id: number;
  pseudo: string;
  badge: 'green' | 'red' | 'yellow';
  profile: 'DESIGNNEUR' | 'DEVELOPPEUR';
}

@Component({
  selector: 'app-penging-list',
  imports: [CommonModule],
  templateUrl: './pending-list.html',
  styleUrl: './pending-list.css',
})
export class PendingList {
  users: User[] = [
    { id: 1, pseudo: 'Aminata', badge: 'green', profile: 'DESIGNNEUR' },
    { id: 2, pseudo: 'Mariam', badge: 'green', profile: 'DEVELOPPEUR' },
    { id: 3, pseudo: 'Rose', badge: 'red', profile: 'DESIGNNEUR' },
    { id: 4, pseudo: 'Pseudo', badge: 'red', profile: 'DEVELOPPEUR' },
    { id: 5, pseudo: 'Pseudo', badge: 'yellow', profile: 'DEVELOPPEUR' },
    { id: 6, pseudo: 'Pseudo', badge: 'green', profile: 'DEVELOPPEUR' },
    { id: 7, pseudo: 'Pseudo', badge: 'yellow', profile: 'DESIGNNEUR' },
    { id: 8, pseudo: 'Pseudo', badge: 'yellow', profile: 'DESIGNNEUR' },
  ];

  constructor() {}

  ngOnInit(): void {}

  acceptUser(userId: number) {
    console.log(`User with ID ${userId} accepted.`);
    // Add logic here to remove the user from the list or update their status
    this.users = this.users.filter((user) => user.id !== userId);
  }

  rejectUser(userId: number) {
    console.log(`User with ID ${userId} rejected.`);
    // Add logic here to remove the user from the list or update their status
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
