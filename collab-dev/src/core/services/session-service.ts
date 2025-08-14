import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getUserId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      return userId ? parseInt(userId, 10) : null;
    }
    return null;
  }

  setUserId(userId: number): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userId', userId.toString());
    }
  }
}