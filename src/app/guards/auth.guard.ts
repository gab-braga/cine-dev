import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const logged = inject(AuthService).isLogged();
  if (!logged) router.navigate(['/auth/login']);
  return logged;
};
