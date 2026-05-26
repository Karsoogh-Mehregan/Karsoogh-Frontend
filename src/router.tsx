import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Home } = await import('@/pages/Home');
      return { Component: Home };
    },
  },

  {
    path: '/challenge/',
    lazy: async () => {
      const { Challenge } = await import('@/pages/Challenge');
      return { Component: Challenge };
    },
  },

  {
    path: '/login',
    lazy: async () => {
      const { default: LoginPage } = await import('@/pages/LoginPage');
      return { Component: LoginPage };
    },
  },

  /* --- Protected Routes --- */
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        lazy: async () => {
          const { default: Dashboard } = await import('@/pages/Dashboard');
          return { Component: Dashboard };
        },
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to={'/'} replace />,
  },
]);

export default router;
