import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PageAsset = {
  src: string;
  pageNumber: number;
};

const pageModules = import.meta.glob('../../docs/mehregan26/مرحله اول/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const pageAssets: PageAsset[] = Object.entries(pageModules)
  .map(([path, src]) => {
    const match = path.match(/Page_(\d+)_Image_/);
    const pageNumber = match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
    return { src, pageNumber };
  })
  .sort((left, right) => left.pageNumber - right.pageNumber);

export default function Mehregan26Flipbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const totalPages = pageAssets.length;
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const goToPrev = () => {
    if (!canGoPrev) return;
    setDirection('right');
    setCurrentPage((p) => p - 1);
  };

  const goToNext = () => {
    if (!canGoNext) return;
    setDirection('left');
    setCurrentPage((p) => p + 1);
  };

  const current = pageAssets[currentPage];

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_12%,rgba(129,84,167,0.2),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(255,214,138,0.14),transparent_28%),linear-gradient(145deg,#3f225f,#2c173f_52%,#1f112d)] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.04)_34%,transparent_48%,rgba(255,214,138,0.04)_67%,transparent_85%)]" />

      <header className="relative z-10 mb-5 text-right text-white">
        <h1 className="text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
          بیست‌و‌ششمین دوره کارسوق ریاضی مهرگان - مرحله اول
        </h1>

        <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur-[2px]">
          {currentPage + 1} / {totalPages}
        </div>
      </header>

      <div className="relative mx-auto w-full max-w-[900px]">
        <button
          type="button"
          onClick={goToPrev}
          disabled={!canGoPrev}
          className="absolute right-[-0.25rem] top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/12 text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-35 sm:right-[-0.75rem] lg:right-[-1.25rem]"
          aria-label="صفحه قبلی"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <button
          type="button"
          onClick={goToNext}
          disabled={!canGoNext}
          className="absolute left-[-0.25rem] top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/12 text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-35 sm:left-[-0.75rem] lg:left-[-1.25rem]"
          aria-label="صفحه بعدی"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div className="relative mx-auto aspect-[560/780] w-full overflow-hidden rounded-[1.35rem] bg-[#f7f4eb] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          {current && (
            <img
              key={current.src}
              src={current.src}
              alt={`صفحه ${current.pageNumber} دفترچه سوالات کارسوق مهرگان ۲۶`}
              className="h-full w-full animate-in object-contain"
              style={{
                animation: `${direction === 'left' ? 'slideInLeft' : 'slideInRight'} 0.35s ease-out`,
              }}
            />
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2" dir="ltr">
          {pageAssets.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection(idx > currentPage ? 'left' : 'right');
                setCurrentPage(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentPage ? 'w-8 bg-amber-300' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`برو به صفحه ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
				@keyframes slideInLeft {
					from { opacity: 0.6; transform: translateX(-40px); }
					to { opacity: 1; transform: translateX(0); }
				}
				@keyframes slideInRight {
					from { opacity: 0.6; transform: translateX(40px); }
					to { opacity: 1; transform: translateX(0); }
				}
			`}</style>
    </section>
  );
}
