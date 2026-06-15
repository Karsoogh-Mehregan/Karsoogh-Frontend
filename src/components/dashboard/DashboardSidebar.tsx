import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { LogOut, UserRound, FolderOpen, Trophy, ChevronRight, X, Menu } from 'lucide-react';
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

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    // Auto-close sidebar on mobile after selecting a tab
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const navItems = [
    { id: 'profile' as Tab, label: 'پروفایل من', icon: UserRound },
    { id: 'resources' as Tab, label: 'منابع', icon: FolderOpen },
    { id: 'challenges' as Tab, label: 'چالش‌ها', icon: Trophy },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile floating menu button (only visible when sidebar is closed on mobile) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 right-4 z-50 lab-button-ghost min-h-10 px-3 py-2 md:hidden"
          title="باز کردن منو"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col border-l border-white/10 bg-[#070b14]/90 backdrop-blur-xl transition-all duration-300
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'md:w-20 w-64 translate-x-full md:translate-x-0'}`}
      >
        <div className="flex h-full flex-col p-4">
          <div
            className={`flex items-center mb-6 px-2 ${
              isSidebarOpen ? 'justify-between' : 'md:justify-center justify-between'
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
                className="hidden md:inline-flex lab-button-ghost min-h-10 px-3 py-2 items-center justify-center focus:outline-none"
                title="باز کردن منو"
              >
                <Menu size={28} />
              </button>
            )}

            {isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex shrink-0 h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="بستن منو"
              >
                <span className="hidden md:block">
                  <ChevronRight size={20} />
                </span>
                <span className="md:hidden">
                  <X size={20} />
                </span>
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
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                  } ${!isSidebarOpen ? 'md:justify-center' : ''}`}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className={`whitespace-nowrap ${!isSidebarOpen ? 'md:hidden' : ''}`}>
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
                  !isSidebarOpen ? 'md:justify-center' : ''
                }`}
                title={!isSidebarOpen ? 'خروج از حساب' : undefined}
              >
                <LogOut size={18} className="shrink-0" />
                <span className={`whitespace-nowrap ${!isSidebarOpen ? 'md:hidden' : ''}`}>
                  {isLoggingOut ? 'در حال خروج...' : 'خروج از حساب'}
                </span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
