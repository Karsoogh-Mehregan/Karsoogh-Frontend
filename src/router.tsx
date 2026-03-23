import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import { Home } from '@/pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  /* --- Protected Routes --- */
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to={'/'} replace />,
  },
]);

export default router;
