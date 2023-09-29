import { LazyComponent, RoutesMap } from '../types';
import { lazy } from 'react';

const LazySignIn: LazyComponent = lazy(() => import('../pages/signin'));

export const PublicRoutes: RoutesMap = [
  {
    path: '/signin',
    public: true,
    strict: true,
    useComponent: () => <LazySignIn/>,
    symlinks: [
      '/',
    ],
  },
];