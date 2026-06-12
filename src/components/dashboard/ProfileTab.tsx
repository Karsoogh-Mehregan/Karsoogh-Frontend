import { useAuth } from '@/context/AuthContext';
import { Mail, Phone, Shield, UserRound } from 'lucide-react';

export default function ProfileTab() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-6 border-b border-white/10 pb-4">
        اطلاعات حساب کاربری
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <UserRound size={16} />
            <span>نام کاربری</span>
          </div>
          <p className="font-bold text-white text-lg">{user?.username || 'ثبت نشده'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Mail size={16} />
            <span>ایمیل</span>
          </div>
          <p className="font-bold text-white text-lg">{user?.email || 'ثبت نشده'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Phone size={16} />
            <span>شماره تماس</span>
          </div>
          <p className="font-bold text-white text-lg">{user?.phone || 'ثبت نشده'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Shield size={16} />
            <span>کد ملی</span>
          </div>
          <p className="font-bold text-white text-lg">{user?.national_code || 'ثبت نشده'}</p>
        </div>
      </div>
    </div>
  );
}
