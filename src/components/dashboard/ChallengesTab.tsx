import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChallengesTab() {
  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-6 border-b border-white/10 pb-4">چالش‌ها</h2>
      <div className="flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-amber-500/10 mb-4">
          <Trophy size={32} className="text-amber-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">چالش‌های هفتگی</h3>
        <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
          شما می‌توانید در چالش‌های هفتگی کارسوق شرکت کنید و امتیاز کسب کنید.
        </p>
        <Link to="/challenge" className="lab-button-primary">
          ورود به بخش چالش
        </Link>
      </div>
    </div>
  );
}
