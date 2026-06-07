import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './components/PublicLayout';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
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
        path: '/contact-us',
        lazy: async () => {
          const { default: ContactUs } = await import('@/pages/ContactUs');
          return { Component: ContactUs };
        },
      },

      {
        path: '/docs',
        lazy: async () => {
          const { default: DocsIndex } = await import('@/components/docs/DocsIndex');
          return { Component: DocsIndex };
        },
      },

      {
        path: '/docs/:docName/:tabName?',
        lazy: async () => {
          const { default: DocViewer } = await import('@/components/docs/DocViewer');
          return { Component: DocViewer };
        },
      },
    ],
  },

  {
    path: '/login',
    lazy: async () => {
      const { default: LoginPage } = await import('@/pages/LoginPage');
      return { Component: LoginPage };
    },
  },

  {
    path: '/contact',
    element: <Navigate to="/contact-us" replace />,
  },

  {
    path: '/zillink',
    element: <Navigate to="/contact-us" replace />,
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
