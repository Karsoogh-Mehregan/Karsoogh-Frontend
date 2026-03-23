import { useAuth } from '@/context/AuthContext';
import router from '@/router';
import { authService } from '@/services/authService';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await authService.login({ username, password });
      login(response.user);
      toast.success('ورود با موفقیت انجام شد');
      router.navigate('/dashboard');
    } catch (err) {
      console.log(err);
      const errMessage = (err as Error).message;
      setError(errMessage);
      toast.error(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex container justify-center align-middle mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 justify-center align-middle min-w-[30vw]"
        >
          <h2 className="font-bold text-center">ورود</h2>
          {/* TODO: make these UI better */}
          {error && <p>{error}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="text-black p-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-black p-2"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>
    </>
  );
}
