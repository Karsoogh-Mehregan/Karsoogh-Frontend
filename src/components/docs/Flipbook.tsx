import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PageAsset = {
  src: string;
  pageNumber: number;
};

const allDocImages = import.meta.glob('../../docs/**/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

type FlipbookProps = {
  /** Relative folder path inside src/docs (e.g., "mehregan26/exam/first-round") */
  folder?: string;
  /** Alternatively, pass pre-parsed page assets directly */
  pages?: PageAsset[];
  /** Heading title */
  title: string;
  /** Used in image alt text: "صفحه X {altPrefix}" */
  altPrefix?: string;
};

export default function Flipbook({
  folder,
  pages: directPages,
  title,
  altPrefix = 'دفترچه سوالات',
}: FlipbookProps) {
  const pages = useMemo(() => {
    if (directPages) return directPages;
    if (!folder) return [];

    const normalizedFolder = folder.toLowerCase().trim();
    return Object.entries(allDocImages)
      .filter(([path]) => path.toLowerCase().includes(normalizedFolder))
      .map(([path, src]) => {
        const match = path.match(/Page_(\d+)_/i) || path.match(/(\d+)/);
        const pageNumber = match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
        return { src, pageNumber };
      })
      .sort((a, b) => a.pageNumber - b.pageNumber);
  }, [folder, directPages]);

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const totalPages = pages.length;
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const goToPrev = useCallback(() => {
    if (!canGoPrev) return;
    setDirection('right');
    setCurrentPage((p) => p - 1);
  }, [canGoPrev]);

  const goToNext = useCallback(() => {
    if (!canGoNext) return;
    setDirection('left');
    setCurrentPage((p) => p + 1);
  }, [canGoNext]);

  useEffect(() => {
    const nextIdx = currentPage + 1;
    const prevIdx = currentPage - 1;
    if (nextIdx < totalPages && pages[nextIdx]) {
      const img = new Image();
      img.src = pages[nextIdx].src;
    }
    if (prevIdx >= 0 && pages[prevIdx]) {
      const img = new Image();
      img.src = pages[prevIdx].src;
    }
  }, [currentPage, totalPages, pages]);

  // Keyboard navigation (RTL: ArrowRight = prev, ArrowLeft = next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToPrev();
      if (e.key === 'ArrowLeft') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  const current = pages[currentPage];

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_12%,rgba(129,84,167,0.2),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(255,214,138,0.14),transparent_28%),linear-gradient(145deg,#3f225f,#2c173f_52%,#1f112d)] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.04)_34%,transparent_48%,rgba(255,214,138,0.04)_67%,transparent_85%)]" />

      <header className="relative z-10 mb-5 text-right text-white">
        <h1 className="text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">{title}</h1>

        {totalPages > 0 && (
          <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur-[2px]">
            {currentPage + 1} / {totalPages}
          </div>
        )}
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
              alt={`صفحه ${current.pageNumber} ${altPrefix}`}
              decoding="async"
              className="h-full w-full object-contain"
              style={{
                animation: `${direction === 'left' ? 'slideInLeft' : 'slideInRight'} 0.35s ease-out`,
              }}
            />
          )}
        </div>

        {totalPages > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2" dir="rtl">
            {pages.map((page, idx) => (
              <button
                key={page.src}
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
        )}
      </div>
    </section>
  );
}
