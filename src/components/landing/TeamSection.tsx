import { useState } from 'react';
import { UsersRound } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { teamMembers } from './landingData';

const MOBILE_PREVIEW_COUNT = 4;

export function TeamSection() {
  const [showAllMobileMembers, setShowAllMobileMembers] = useState(false);
  const visibleMobileMembers = showAllMobileMembers
    ? teamMembers
    : teamMembers.slice(0, MOBILE_PREVIEW_COUNT);

  return (
    <section id="Team" className="scroll-mt-28 py-16">
      <SectionHeader
        eyebrow="کادر برگزاری"
        title="تیم دوره ۲۶"
        icon={UsersRound}
        description="در موبایل ابتدا اعضای اصلی را می‌بینید و برای دیدن همه‌ی تیم می‌توانید فهرست را باز کنید."
      />

      <div className="grid gap-3 md:hidden" aria-label="اعضای کادر برگزاری">
        {visibleMobileMembers.map((member) => (
          <article key={member.fullName} className="lab-card flex items-center gap-4 p-3">
            <img
              src={member.image}
              alt={member.fullName}
              className="h-20 w-20 shrink-0 rounded-2xl object-cover object-top"
              loading="lazy"
              decoding="async"
              width={80}
              height={80}
            />
            <div className="min-w-0">
              <h3 className="break-words text-base font-black text-white">{member.fullName}</h3>
              <p className="mt-1 text-sm font-bold leading-6 text-cyan-100/80">{member.role}</p>
            </div>
          </article>
        ))}

        {teamMembers.length > MOBILE_PREVIEW_COUNT && (
          <button
            type="button"
            className="lab-button-secondary w-full"
            onClick={() => setShowAllMobileMembers((value) => !value)}
            aria-expanded={showAllMobileMembers}
          >
            {showAllMobileMembers ? 'نمایش کمتر' : `نمایش همه اعضا (${teamMembers.length})`}
          </button>
        )}
      </div>

      <div
        className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-label="اعضای کادر برگزاری"
      >
        {teamMembers.map((member) => (
          <article key={member.fullName} className="lab-card overflow-hidden p-4">
            <img
              src={member.image}
              alt={member.fullName}
              className="h-56 w-full rounded-2xl object-cover object-top md:h-64"
              loading="lazy"
              decoding="async"
              width={320}
              height={256}
            />
            <h3 className="mt-4 text-lg font-black text-white">{member.fullName}</h3>
            <p className="mt-2 text-sm font-bold text-cyan-100/80">{member.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
