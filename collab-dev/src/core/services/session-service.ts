import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  getUserId(): number {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return user?.id || 0;
    }
    return 0; // Retourne une valeur par défaut côté serveur
  }
}