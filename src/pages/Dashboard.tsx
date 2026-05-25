import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { motion } from 'framer-motion';
import { BadgeCheck, LogOut, Mail, Phone, Shield, UserRound } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(' ') ||
    user?.username ||
    'کاربر کارسوق';

  const profileItems = [
    { label: 'نام کاربری', value: user?.username, icon: UserRound },
    { label: 'ایمیل', value: user?.email, icon: Mail },
    { label: 'شماره تماس', value: user?.phone, icon: Phone },
    { label: 'کد ملی', value: user?.national_code, icon: Shield },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    let serverLogoutFailed = false;

    try {
      await authService.logout();
    } catch (error) {
      serverLogoutFailed = true;
      console.error(error);
    } finally {
      await logout();
      setIsLoggingOut(false);
      navigate('/', { replace: true });

      if (serverLogoutFailed) {
        toast.error('ارتباط با سرور قطع بود، اما نشست محلی شما بسته شد.');
      } else {
        toast.success('با موفقیت خارج شدید.');
      }
    }
  };

  return (
    <div className="lab-shell" dir="rtl" lang="fa">
      <main className="lab-container py-8 md:py-10">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="lab-kicker">
              <BadgeCheck size={15} aria-hidden="true" />
              پنل کاربری
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight text-white md:text-5xl">
              خوش آمدید، {displayName}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              این صفحه فقط داده‌های واقعی حساب شما را نشان می‌دهد و برای افزودن مسیرهای رقابتی آینده
              آماده شده است.
            </p>
          </div>

          <button
            type="button"
            className="lab-button-secondary w-full md:w-auto"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut size={18} aria-hidden="true" />
            {isLoggingOut ? 'در حال خروج...' : 'خروج از حساب'}
          </button>
        </header>

        <section className="grid gap-5 py-7 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lab-card p-6"
          >
            <div className="grid h-20 w-20 place-items-center rounded-3xl border border-cyan-200/20 bg-cyan-200/10 text-2xl font-black text-cyan-100">
              {displayName.slice(0, 1)}
            </div>
            <h2 className="mt-5 text-2xl font-black text-white">{displayName}</h2>
            <p className="mt-2 text-sm text-slate-400">{user?.username}</p>

            <div className="mt-6 rounded-2xl border border-emerald-200/20 bg-emerald-300/10 p-4">
              <p className="text-sm font-black text-emerald-100">وضعیت حساب</p>
              <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                نشست شما فعال است و اطلاعات پروفایل از سرویس احراز هویت دریافت شده است.
              </p>
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lab-card p-6"
            aria-labelledby="profile-title"
          >
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold text-cyan-100/70">Profile Snapshot</p>
                <h2 id="profile-title" className="mt-1 text-2xl font-black text-white">
                  اطلاعات حساب
                </h2>
              </div>
              <p className="text-sm text-slate-400">نمایش داده‌های تاییدشده کاربر</p>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {profileItems.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                >
                  <dt className="flex items-center gap-2 text-sm font-bold text-slate-300">
                    <Icon size={17} aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-3 min-h-7 break-words text-base font-black text-white">
                    {value || 'ثبت نشده'}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4 text-sm leading-7 text-amber-50">
              مسیر مسابقه‌ها، تمرین‌ها و گزارش پیشرفت بعد از اضافه شدن APIهای مربوطه در همین پنل
              قرار می‌گیرد.
            </div>
          </motion.section>
        </section>
      </main>
    </div>
  );
}
