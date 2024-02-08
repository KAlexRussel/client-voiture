import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import MainLayout from 'src/layouts/main';
import { mainRoutes, HomePage } from './main';
import { CompactRoutes } from './compact'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [{ element: <HomePage />, index: true }],
    },

    // Main routes
    ...mainRoutes,

    ...CompactRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
