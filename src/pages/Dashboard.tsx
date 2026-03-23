import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <h1> {user?.username} </h1>
      <button
        onClick={() => {
          authService.logout();
        }}
      >
        Logout
      </button>
    </>
  );
}
