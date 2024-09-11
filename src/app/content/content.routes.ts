import { contentItemResolver } from './content-item.resolver';

const contentRoutes = [
  {
    path: '',
    loadComponent: () => import('./content-list.component'),
  },
  {
    path: ':slug',
    loadComponent: () => import('./content-item.component'),
    resolve: {
      contentItem: contentItemResolver,
    },
  },
];

export default contentRoutes;
