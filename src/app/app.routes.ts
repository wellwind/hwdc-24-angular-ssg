import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./about/about.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./content/content.routes'),
  },
];
