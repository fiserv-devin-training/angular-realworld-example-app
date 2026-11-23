import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from './services/user.service';

/** Guard that requires authentication. Redirects to /login if not authenticated. */
export const requireAuth = () => {
  const router = inject(Router);
  return inject(UserService).isAuthenticated.pipe(map(isAuth => isAuth || router.createUrlTree(['/login'])));
};

/** Guard for pages that are only for anonymous users (login, register). */
export const requireAnonymous = () => inject(UserService).isAuthenticated.pipe(map(isAuth => !isAuth));
