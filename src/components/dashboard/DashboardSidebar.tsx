import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { LogOut, UserRound, FolderOpen, Trophy, ChevronRight, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Tab = 'profile' | 'resources' | 'challenges';

interface DashboardSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
}: DashboardSidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(' ') ||
    user?.username ||
    'کاربر کارسوق';

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

  const navItems = [
    { id: 'profile' as Tab, label: 'پروفایل من', icon: UserRound },
    { id: 'resources' as Tab, label: 'منابع', icon: FolderOpen },
    { id: 'challenges' as Tab, label: 'چالش‌ها', icon: Trophy },
  ];

  return (
    <aside
      className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col border-l border-white/10 bg-[#070b14]/50 backdrop-blur-xl transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex h-full flex-col p-4">
        <div
          className={`flex items-center mb-6 px-2 ${
            isSidebarOpen ? 'justify-between' : 'justify-center'
          }`}
        >
          {isSidebarOpen ? (
            <div className="overflow-hidden">
              <h2 className="text-xl font-black text-white truncate">{displayName}</h2>
              <p className="text-sm text-slate-400 mt-1 truncate">{user?.username}</p>
            </div>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors focus:outline-none"
              title="باز کردن منو"
            >
              <LayoutDashboard size={20} />
            </button>
          )}

          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex shrink-0 h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="بستن منو"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                } ${!isSidebarOpen ? 'justify-center' : ''}`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                <span className={`whitespace-nowrap ${!isSidebarOpen ? 'hidden' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          <div className="mt-auto">
            <div className="my-2 h-px w-full bg-white/10" />
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors border border-transparent ${
                !isSidebarOpen ? 'justify-center' : ''
              }`}
              title={!isSidebarOpen ? 'خروج از حساب' : undefined}
            >
              <LogOut size={18} className="shrink-0" />
              <span className={`whitespace-nowrap ${!isSidebarOpen ? 'hidden' : ''}`}>
                {isLoggingOut ? 'در حال خروج...' : 'خروج از حساب'}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
