import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import { Home } from '@/pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '*',
    element: <Navigate to={'/'} replace />,
  },
]);

export default router;
