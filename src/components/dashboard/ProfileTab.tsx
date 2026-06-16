import { useAuth } from '@/context/AuthContext';
import { GraduationCap, Mail, Phone, Shield, UserRound, MapPin, Map } from 'lucide-react';
import Skeleton from '@/components/Skeleton';

function ProfileSkeleton() {
  return (
    <div>
      <Skeleton.Bone width="50%" height="1.5rem" className="mb-6 pb-4" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton.Bone width={16} height={16} borderRadius={4} />
              <Skeleton.Bone width="40%" height="0.75rem" />
            </div>
            <Skeleton.Bone width="65%" height="1.1rem" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfileTab() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  const displayName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || null;

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
            <UserRound size={16} />
            <span>نام و نام خانوادگی</span>
          </div>
          <p className="font-bold text-white text-lg">{displayName || 'ثبت نشده'}</p>
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
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <GraduationCap size={16} />
            <span>مدرسه</span>
          </div>
          <p className="font-bold text-white text-lg">{user?.school?.title || 'ثبت نشده'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Map size={16} />
            <span>استان</span>
          </div>
          <p className="font-bold text-white text-lg">{user?.province?.title || 'ثبت نشده'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <MapPin size={16} />
            <span>شهر</span>
          </div>
          <p className="font-bold text-white text-lg">{user?.city?.title || 'ثبت نشده'}</p>
        </div>
      </div>
    </div>
  );
}
