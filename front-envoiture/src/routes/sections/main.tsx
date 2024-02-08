import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from 'src/auth/guard';
import MainLayout from 'src/layouts/main';

export const HomePage = lazy(() => import('src/pages/home/home'));

const FaqsPage = lazy(() => import('src/pages/faqsPage'));

const AboutUsPage = lazy(() => import('src/pages/about-us'));

const UserProfilePage = lazy(() => import('src/pages/user/profile'));

const SearchPage = lazy(() => import('src/pages/search/search'))
const TrajetPage = lazy(() => import('src/pages/search/trajets'))
const TrajetDetailPage = lazy(() => import('src/pages/search/trajet-details'))

const RidePage = lazy(() => import('src/pages/rides/rides'))

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: 'user',
        element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ), 
        children: [
          { element: <UserProfilePage />, index: true },
          { path: ':id/:name', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'faqs',
        children: [
          { element: <FaqsPage />, index: true },
        ],
      },
      {
        path: 'qui-somme-nous',
        children: [
          { element: <AboutUsPage />, index: true },
        ],
      },
      {
        path: 'search',
       /* element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ), */
        children: [
          { element: <SearchPage />, index: true },
          { path: 'trajets', element: <TrajetPage /> },
          { path: 'trajets/:id', element: <TrajetDetailPage /> },
        ],
      },
      {
        path: 'ride',
        children: [
          { element: <RidePage />, index: true },
        ],
      },
    ],
  },
];
