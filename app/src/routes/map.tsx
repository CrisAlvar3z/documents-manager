import { RouteConfig, RoutesMap } from '../types';
import { PrivateRoutes } from './private.map';
import { PublicRoutes } from './public.map';
import { SessionProvider } from '../providers/session.provider';
import NotFound from '../pages/404';

export const notFoundRouteWildcard: Required<Pick<RouteConfig, 'path' | 'public' | 'useComponent'>> = {
  path: '*',
  public: true,
  useComponent: () => <NotFound />,
};

export const Routes: RoutesMap = [
  ...PublicRoutes,
  ...PrivateRoutes,
];

export default Routes;