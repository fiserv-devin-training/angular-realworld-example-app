import { Routes } from '@angular/router';
import { requireAuth } from '@conduit/shared';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'tag/:tag',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'editor',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/editor/editor.component'),
        canActivate: [requireAuth],
      },
      {
        path: ':slug',
        loadComponent: () => import('./pages/editor/editor.component'),
        canActivate: [requireAuth],
      },
    ],
  },
  {
    path: 'article/:slug',
    loadComponent: () => import('./pages/article/article.component'),
  },
];

export default routes;
