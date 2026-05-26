import { Camera, GalleryHorizontalEnd } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { galleryItems } from './landingData';

export function GallerySection() {
  return (
    <section id="Gallery" className="scroll-mt-28 py-16">
      <SectionHeader
        eyebrow="آرشیو تصویری"
        title="گالری تصاویر"
        icon={GalleryHorizontalEnd}
        description="در نسخه جدید فعلاً پیش‌نمایشی از دارایی‌های قدیمی نمایش داده می‌شود و اتصال گالری به API جدید بعداً انجام می‌گیرد."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {galleryItems.map((item) => (
          <article key={item.title} className="group lab-card overflow-hidden">
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width={360}
                height={224}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
              <Camera className="absolute left-4 top-4 h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
