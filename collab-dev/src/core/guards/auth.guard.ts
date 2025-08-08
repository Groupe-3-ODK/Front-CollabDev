import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const currentUser = localStorage.getItem('currentUser');

  if (currentUser !== null) {
    // Rediriger vers le dashboard si déjà connecté
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
