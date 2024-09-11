import { Routes } from '@angular/router';

const aboutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./about.component'),
  },
];

export default aboutRoutes;
