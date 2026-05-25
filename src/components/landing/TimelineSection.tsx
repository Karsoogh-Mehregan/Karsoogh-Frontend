import { CalendarClock } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { timelineItems } from './landingData';

export function TimelineSection() {
  return (
    <section id="Timeline" className="scroll-mt-28 py-16">
      <SectionHeader
        eyebrow="مسیر برگزاری"
        title="از ثبت‌نام تا تجربه حضوری"
        icon={CalendarClock}
        description="زمان‌بندی دقیق دوره جدید بعد از نهایی شدن ثبت‌نام منتشر می‌شود؛ ساختار کلی رویداد چندمرحله‌ای باقی می‌ماند."
      />

      <div className="grid gap-4 md:grid-cols-4">
        {timelineItems.map((item, index) => (
          <div key={item.title} className="lab-card p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-200/10 text-sm font-black text-cyan-100 ring-1 ring-cyan-200/20">
              {index + 1}
            </span>
            <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
