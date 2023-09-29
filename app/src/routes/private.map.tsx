import { LazyComponent, RoutesMap } from '../types';
import { lazy } from 'react';

const LazyDocuments: LazyComponent = lazy(() => import('../pages/documentos'));
const LazyDisplayDocument: LazyComponent = lazy(() => import('../components/DisplayDocument'));

export const PrivateRoutes: RoutesMap = [
  {
    path: '/documentos',
    public: false,
    strict: true,
    useComponent: () => <LazyDocuments />,
  },
  {
    path: '/documentos/:media',
    public: false,
    strict: true,
    useComponent: () => <LazyDisplayDocument />,
  }
];