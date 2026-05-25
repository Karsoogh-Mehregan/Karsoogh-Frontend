import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="lab-shell grid min-h-screen place-items-center px-5" dir="rtl" lang="fa">
        <div className="lab-card max-w-sm p-6 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-cyan-200/20 border-t-cyan-200" />
          <p className="mt-5 text-sm font-bold text-slate-200">در حال بررسی نشست کاربری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
