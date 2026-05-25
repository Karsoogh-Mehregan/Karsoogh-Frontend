import { Trophy } from 'lucide-react';
import { landingAssets } from './landingData';

export function ChallengeSection() {
  return (
    <section id="Challenge" className="scroll-mt-28 py-16">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
        <div className="lab-card overflow-hidden">
          <img
            src={landingAssets.galleryGil2}
            alt="نمای تصویری چالش هفتگی"
            className="h-full min-h-80 w-full object-cover opacity-85"
            loading="lazy"
            decoding="async"
            width={640}
            height={420}
          />
        </div>
        <div className="lab-card p-6 md:p-8">
          <span className="lab-kicker">
            <Trophy size={15} aria-hidden="true" />
            چالش هفتگی
          </span>
          <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">
            مسئله‌های کوتاه، نگاه‌های تازه
          </h2>
          <p className="mt-5 text-sm leading-8 text-slate-300 md:text-base">
            چالش هفتگی در سایت قدیمی مسیر جداگانه‌ای برای دریافت پاسخ داشت. در نسخه جدید، این بخش
            فعلاً به شکل معرفی و فراخوان نمایش داده می‌شود تا بعد از آماده شدن API جدید، ارسال پاسخ
            به همین تجربه اضافه شود.
          </p>
          <button type="button" className="lab-button-secondary mt-7" disabled>
            چالش فعال به‌زودی اعلام می‌شود
          </button>
        </div>
      </div>
    </section>
  );
}
