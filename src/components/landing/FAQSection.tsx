import { CircleHelp } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { faqItems } from './landingData';

export function FAQSection() {
  return (
    <section id="FAQ" className="scroll-mt-28 py-16">
      <SectionHeader
        eyebrow="پرسش و پاسخ"
        title="سوالات متداول"
        icon={CircleHelp}
        description="پاسخ‌ها بر اساس محتوای فرانت قدیمی کارسوق بازنویسی شده‌اند."
      />

      <div className="mx-auto grid max-w-4xl gap-3">
        {faqItems.map((item) => (
          <details key={item.question} className="group lab-card p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-white">
              {item.question}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-cyan-100 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-8 text-slate-300">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
