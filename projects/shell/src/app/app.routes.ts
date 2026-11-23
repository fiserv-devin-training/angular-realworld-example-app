import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { requireAnonymous, requireAuth } from '@conduit/shared';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/auth.component'),
    canActivate: [requireAnonymous],
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/auth.component'),
    canActivate: [requireAnonymous],
  },
  {
    path: 'settings',
    loadComponent: () => loadRemoteModule('profile', './Settings').then(m => m.default),
    canActivate: [requireAuth],
  },
  {
    path: 'profile',
    loadChildren: () => loadRemoteModule('profile', './ProfileRoutes').then(m => m.default),
  },
  {
    // home feed, tag filter, article page and editor
    path: '',
    loadChildren: () => loadRemoteModule('articles', './Routes').then(m => m.default),
  },
];
