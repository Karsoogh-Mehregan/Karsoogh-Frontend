import { useAuth } from '@/context/AuthContext';
import router from '@/router';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <>
      <h1> {user?.username} </h1>
      <button
        onClick={() => {
          authService.logout();
          logout();
          toast.success('با موفقیت خارج شدید.');
          router.navigate('/');
        }}
      >
        Logout
      </button>
    </>
  );
}
