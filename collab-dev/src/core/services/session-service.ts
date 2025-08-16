import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  getUserId(): number {
    // Implémentez la récupération de l'ID utilisateur depuis le stockage local/session
    // Par exemple :
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.id || 0;
  }
}