import { Lightbulb } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { landingAssets } from './landingData';

export function AboutSection() {
  return (
    <section id="About" className="scroll-mt-28 py-16">
      <SectionHeader
        eyebrow="درباره کارسوق"
        title="کارسوق؟ کارسوق کیه؟"
        icon={Lightbulb}
        description=""
      />

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="lab-card p-6 md:p-8">
          <p className="text-base leading-9 text-slate-200 md:text-lg">
            «کارسوق ریاضی» یک رویداد علمی و تعاملی است که توسط دانش‌آموزان و دانشجویان نه‌چندان
            بزرگ‌تر از شما در سراسر کشور برگزار می‌شود. هدف کارسوق این است که مباحث زیبا و جذاب
            ریاضی را به شکلی متفاوت و به دور از روش‌های معمول و استرس امتحان و نمره‌دهی ارائه کند؛
            کارسوق ریاضی مهرگان تلاش می‌کند چهره‌ی ریاضی را خارج از قالب‌های خشک رایج به نمایش
            بگذارد و به دانش‌آموزان نشان بدهد ریاضی واقعی چیست.
          </p>
        </div>

        <div className="lab-card overflow-hidden">
          <img
            src={landingAssets.poster}
            alt="هویت بصری تعاملی کارسوق"
            className="h-64 w-full object-cover opacity-90"
            loading="lazy"
            decoding="async"
            width={520}
            height={256}
          />
          <div className="p-5">
            <p className="text-sm font-black text-white">ثبت‌نام دوره جدید</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              تاریخ جدید ثبت‌نام اطلاع‌رسانی خواهد شد.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
