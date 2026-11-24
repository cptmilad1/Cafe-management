import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import orgRoutes from './orgRoutes';

const LayoutComp = lazy(() => import('../shared/components/layout/Layout'));

function Router() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[60vh] text-cyan-400 text-4xl font-bold">
          Loading...
        </div>
      }
    >
      <Routes>
        {orgRoutes().map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.layout ? (
                <LayoutComp>{route.element}</LayoutComp>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default Router;
