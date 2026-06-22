import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Trophy, ChevronLeft, CheckCircle, Clock, XCircle } from 'lucide-react';
import { challengeService, type ChallengeListItem } from '@/services/challengeService';
import Skeleton from '@/components/Skeleton';

function ChallengesSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-[fadeIn_0.3s_ease-out]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-[1.25rem] border border-white/[0.08]"
        >
          <Skeleton.Bone width={44} height={44} borderRadius="0.75rem" className="shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton.Bone width="45%" height="1rem" />
            <Skeleton.Bone width="70%" height="0.75rem" />
          </div>
          <Skeleton.Bone width={80} height="1.5rem" borderRadius="9999px" className="shrink-0" />
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ challenge }: { challenge: ChallengeListItem }) {
  if (challenge.is_open) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/25">
        <CheckCircle size={11} />
        فعال
      </span>
    );
  }

  const now = new Date();
  const start = new Date(challenge.start_date);
  if (now < start) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/25">
        <Clock size={11} />
        به‌زودی
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-500/15 px-2.5 py-1 text-xs font-bold text-slate-400 border border-slate-500/25">
      <XCircle size={11} />
      پایان‌یافته
    </span>
  );
}

function ChallengeCard({ challenge }: { challenge: ChallengeListItem }) {
  const startDate = new Date(challenge.start_date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      to={`/challenge/${challenge.slug}`}
      className="group flex items-center gap-4 p-4 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-200"
    >
      {/* Icon */}
      <div
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${
          challenge.is_open
            ? 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20'
            : 'bg-slate-500/10 text-slate-500 group-hover:bg-slate-500/15'
        }`}
      >
        <Trophy size={18} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white text-sm truncate">{challenge.title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{startDate}</p>
      </div>

      {/* Badge + arrow */}
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge challenge={challenge} />
        <ChevronLeft
          size={16}
          className="text-slate-600 group-hover:text-cyan-400 transition-colors"
        />
      </div>
    </Link>
  );
}

export default function ChallengesTab() {
  const [challenges, setChallenges] = useState<ChallengeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    challengeService
      .getChallenges()
      .then((data) => {
        if (isMounted) setChallenges(data);
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setError(err.message || 'خطا در دریافت چالش‌ها');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-6 border-b border-white/10 pb-4">چالش‌ها</h2>

      {loading && <ChallengesSkeleton />}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-rose-500/10 mb-4">
            <AlertCircle size={28} className="text-rose-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">خطا در بارگذاری</h3>
          <p className="text-slate-400 max-w-sm leading-relaxed">{error}</p>
        </div>
      )}

      {!loading && !error && challenges.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-amber-500/10 mb-4">
            <Trophy size={32} className="text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">هنوز چالشی وجود ندارد</h3>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            چالش‌های کارسوق به‌زودی در این بخش قرار خواهند گرفت.
          </p>
        </div>
      )}

      {!loading && !error && challenges.length > 0 && (
        <div className="flex flex-col gap-3">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.slug} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
}
