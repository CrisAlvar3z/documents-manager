import { useState, Suspense, useLayoutEffect } from 'react'
import { Navigate, Route, RouteObject, Routes } from 'react-router-dom';
import { notFoundRouteWildcard } from './routes/map';
import { BrowserRouter } from 'react-router-dom';
import { Routes as RoutesMap } from './routes/map';
import { SessionProvider } from './providers/session.provider';
import { IsolatedComponent, RouteConfig } from './types'

const AppRouter: IsolatedComponent = () => {

const [routesConfigs, setRoutesConfigs] = useState<RouteConfig[]>([]);
const [routes, setRoutes] = useState<RouteObject[]>([]);

const getParentAndChildrenRoutes = (routeConfig: RouteConfig): RouteConfig[] => {
    const routeConfigList = [routeConfig];
    if (routeConfig.childRoutes) {
      routeConfig.childRoutes
        .map((childRoute) => getParentAndChildrenRoutes(childRoute))
        .forEach((routeSubMap) => {
          routeSubMap.forEach((route) => {
            route.path = routeConfig.path.concat(route.path);
            routeConfigList.push(route);
          });
        });
    }
    return routeConfigList;
  };

  const getRoutesAndRedirects = () => {
    const $routes: RouteObject[] = [];
    routesConfigs.forEach((config) => {
      if (config.useComponent) {
        const route: RouteObject = {
          path: config.path,
          caseSensitive: false,
          element: <Suspense fallback={null}>
            {config.useComponent() as any}
          </Suspense>,
        };
        if (config.strict) {
          if (config.public && SessionProvider.isAuthenticated()) {
            route.element = <Navigate to='/documentos' />;
          } else if (!config.public && !SessionProvider.isAuthenticated()) {
            route.element = <Navigate to='/signin' />;
          }
        }
        $routes.push(route);
        config.symlinks?.forEach((symlink) => {
          $routes.push({
            path: symlink,
            caseSensitive: false,
            element: <Navigate replace to={config.path} />,
          });
        });
      }
    });
    return $routes;
  };

  useLayoutEffect(() => {
    const $routesConfigs: RouteConfig[] = [];
    RoutesMap.forEach((mapper: any) => {
      getParentAndChildrenRoutes(mapper).forEach((route) => {
        $routesConfigs.push(route);
      });
    });
    setRoutesConfigs($routesConfigs);
  }, []);

  useLayoutEffect(() => {
    setRoutes(getRoutesAndRedirects());
  }, [routesConfigs]);

  return <BrowserRouter basename={'/'}>
    <Routes>
      {routes.map((route, key) => <Route {...route as any} element={route.element as any} key={key as any} />)}
      { /* Default route */ }
      <Route
        path={notFoundRouteWildcard.path}
        element={notFoundRouteWildcard.useComponent() as any} />
    </Routes>
  </BrowserRouter>;
};

export default AppRouter