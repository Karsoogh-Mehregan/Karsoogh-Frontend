import { Lightbulb } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { landingAssets } from './landingData';

export function AboutSection() {
  const aparatSrc = 'https://www.aparat.com/video/video/embed/videohash/4twoM/vt/frame';

  return (
    <section id="About" className="scroll-mt-28 py-16">
      <SectionHeader
        eyebrow="درباره کارسوق"
        title="کارسوق؟ کارسوق کیه؟"
        icon={Lightbulb}
        description=""
      />

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="lab-card flex flex-col p-6 md:p-8">
          <p className="text-base leading-9 text-slate-200 md:text-lg">
            «کارسوق ریاضی» یک رویداد علمی و تعاملی است که توسط دانش‌آموزان و دانشجویان نه‌چندان
            بزرگ‌تر از شما در سراسر کشور برگزار می‌شود. هدف کارسوق این است که مباحث زیبا و جذاب
            ریاضی را به شکلی متفاوت و به دور از روش‌های معمول و استرس امتحان و نمره‌دهی ارائه کند؛
            کارسوق ریاضی مهرگان تلاش می‌کند چهره‌ی ریاضی را خارج از قالب‌های خشک رایج به نمایش
            بگذارد و به دانش‌آموزان نشان بدهد ریاضی واقعی چیست.
          </p>
          <div className="mt-auto mb-auto mx-auto aspect-video overflow-hidden rounded-[10px] sm:w-[90%] md:w-[80%] lg:w-[100%] xl:w-[85%] 2xl:w-[80%]">
            <iframe
              src={aparatSrc}
              allowFullScreen
              className="h-full w-full border-none outline-none"
              title="Aparat Video"
            ></iframe>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={landingAssets.poster}
            alt="پوستر رویداد"
            className="w-full rounded-3xl object-contain opacity-90"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
