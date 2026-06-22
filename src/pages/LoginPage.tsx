import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { AlertCircle, ArrowLeft, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError('');

    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      setError('نام کاربری و رمز عبور را وارد کنید.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ username: trimmedUsername, password });
      login(response.user);
      toast.success('ورود با موفقیت انجام شد');
      navigate(from, { replace: true });
    } catch (err) {
      const errMessage = (err as Error).message;
      setError(errMessage);
      toast.error(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lab-shell grid min-h-screen place-items-center px-5 py-10" dir="rtl" lang="fa">
      <div className="absolute inset-x-0 top-0 mx-auto h-48 max-w-4xl bg-cyan-300/10 blur-3xl" />

      <div
        style={{ animation: 'heroSlideUp 0.55s ease-out both' }}
        className="relative w-full max-w-md"
      >
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          بازگشت به صفحه اصلی
        </Link>

        <form onSubmit={handleSubmit} className="lab-card p-6 sm:p-8">
          <div className="mb-7">
            <h1 className="mt-5 text-3xl font-black text-white">ورود به کارسوق</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              برای ورود نام کاربری و رمز عبور خود را وارد کنید.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 flex gap-3 rounded-2xl border border-rose-300/25 bg-rose-400/10 p-4 text-sm leading-7 text-rose-100"
            >
              <AlertCircle className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-5">
            <label className="block" htmlFor="username">
              <span className="mb-2 block text-sm font-bold text-slate-200">نام کاربری</span>
              <span className="relative block">
                <UserRound className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="مثلا karsoogh_user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  aria-invalid={!!error}
                  className="lab-input pr-12"
                />
              </span>
            </label>

            <label className="block" htmlFor="password">
              <span className="mb-2 block text-sm font-bold text-slate-200">رمز عبور</span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={!!error}
                  className="lab-input px-12"
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
          </div>

          <button type="submit" disabled={isLoading} className="lab-button-primary mt-7 w-full">
            {isLoading ? 'در حال ورود...' : 'ورود به پنل'}
          </button>
        </form>
      </div>
    </div>
  );
}
