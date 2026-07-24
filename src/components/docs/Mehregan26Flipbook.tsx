import { useEffect, useMemo, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type FlipMode = 'double' | 'portrait';

type FlipBookApi = {
  flipNext: () => void;
  flipPrev: () => void;
  getCurrentPageIndex: () => number;
};

type FlipBookInstance = {
  pageFlip: () => FlipBookApi;
};

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

function useFlipMode(): FlipMode {
  const [mode, setMode] = useState<FlipMode>('double');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');

    const updateMode = () => {
      setMode(mediaQuery.matches ? 'portrait' : 'double');
    };

    updateMode();
    mediaQuery.addEventListener('change', updateMode);

    return () => mediaQuery.removeEventListener('change', updateMode);
  }, []);

  return mode;
}

function BookPage({
  src,
  pageNumber,
  isCover = false,
}: {
  src: string;
  pageNumber: number;
  isCover?: boolean;
}) {
  if (isCover) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-[#5b3378] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,245,216,0.18),transparent_28%),radial-gradient(circle_at_82%_15%,rgba(255,255,255,0.12),transparent_25%),radial-gradient(circle_at_50%_115%,rgba(31,18,47,0.42),transparent_34%),linear-gradient(145deg,rgba(74,40,104,0.98),rgba(92,57,123,0.94)_50%,rgba(42,19,64,0.98))]" />
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_0)] [background-size:18px_18px]" />
        <div className="relative z-10 flex h-full flex-col p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.62rem] font-black tracking-[0.22em] text-amber-50 sm:px-4 sm:py-1.5 sm:text-[0.68rem]">
              KARSOOGH 26
            </div>
            <div className="rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-bold text-[#5b3378] shadow-[0_10px_24px_rgba(0,0,0,0.14)] sm:text-xs">
              مرحله اول
            </div>
          </div>

          <div className="relative mt-4 flex-1 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#f7f4eb] shadow-[0_30px_70px_rgba(18,8,32,0.3)]">
            <img
              src={src}
              alt="جلد دفترچه سوالات کارسوق مهرگان ۲۶"
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[1rem] border border-white/20 bg-black/18 px-3 py-2 text-[0.68rem] font-bold text-white backdrop-blur-[1px]">
              بیست‌و‌ششمین دوره کارسوق ریاضی مهرگان
            </div>
          </div>

          <div className="mt-3 text-right">
            <p className="text-xs text-white/75">دفترچه سوالات مرحله اول · ۱۱ تیر ۱۴۰۵</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-[#f7f4eb] text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.9),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(98,62,129,0.08),transparent_28%),linear-gradient(145deg,#fbf8ef,#f3ebdb_55%,#efe4ce)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(67,43,29,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(67,43,29,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative z-10 flex h-full flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-[#6d5134]/15 bg-white/60 px-3 py-1 text-[0.68rem] font-black tracking-[0.18em] text-[#7c5d3d]">
            PAGE {String(pageNumber).padStart(2, '0')}
          </span>
          <span className="text-xs font-bold text-[#a18462]">Karsoogh 26</span>
        </div>

        <div className="relative mt-3 flex-1 overflow-hidden rounded-[1rem] border border-black/5 bg-[#f7f4eb] shadow-[0_20px_45px_rgba(65,44,28,0.12)]">
          <img
            src={src}
            alt={`صفحه ${pageNumber} دفترچه سوالات کارسوق مهرگان ۲۶`}
            className="h-full w-full object-contain p-1 sm:p-2"
          />
        </div>
      </div>
    </div>
  );
}

export default function Mehregan26Flipbook() {
  const flipBookRef = useRef<FlipBookInstance | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const mode = useFlipMode();

  const goToPrevPage = () => {
    const flip = flipBookRef.current?.pageFlip();
    if (flip) {
      flip.flipPrev();
    }
  };

  const goToNextPage = () => {
    const flip = flipBookRef.current?.pageFlip();
    if (flip) {
      flip.flipNext();
    }
  };

  const containerRatio = useMemo(() => (mode === 'portrait' ? '560 / 780' : '1120 / 780'), [mode]);

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < pageAssets.length - 1;

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_12%,rgba(129,84,167,0.2),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(255,214,138,0.14),transparent_28%),linear-gradient(145deg,#3f225f,#2c173f_52%,#1f112d)] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.04)_34%,transparent_48%,rgba(255,214,138,0.04)_67%,transparent_85%)]" />

      <header className="relative z-10 mb-5 text-right text-white">
        <h1 className="text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
          بیست‌و‌ششمین دوره کارسوق ریاضی مهرگان - مرحله اول
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          دفترچه واقعی مرحله اول به‌صورت یک کتابچه سه‌بعدی با ورق‌زدن نرم، سایه‌ی صفحه و حالت دسکتاپ
          / موبایل سازگار شده است.
        </p>
        <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur-[2px]">
          {mode === 'portrait' ? 'portrait / swipe' : 'double / desktop'} · {currentPage + 1}/
          {pageAssets.length}
        </div>
      </header>

      <div
        className="relative mx-auto w-full max-w-[1240px]"
        style={{ aspectRatio: containerRatio }}
      >
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={!canGoPrev}
          className="absolute right-[-0.25rem] top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/12 text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-35 sm:right-[-0.75rem] lg:right-[-1.25rem]"
          aria-label="صفحه قبلی"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={!canGoNext}
          className="absolute left-[-0.25rem] top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/12 text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-35 sm:left-[-0.75rem] lg:left-[-1.25rem]"
          aria-label="صفحه بعدی"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <HTMLFlipBook
          ref={flipBookRef}
          key={mode}
          width={560}
          height={780}
          size="stretch"
          minWidth={320}
          maxWidth={1240}
          minHeight={520}
          maxHeight={1080}
          style={{}}
          startZIndex={0}
          showCover
          autoSize
          usePortrait={mode === 'portrait'}
          flippingTime={760}
          drawShadow
          maxShadowOpacity={0.42}
          clickEventForward
          mobileScrollSupport
          useMouseEvents
          swipeDistance={12}
          showPageCorners={false}
          disableFlipByClick={false}
          className="mx-auto"
          startPage={0}
          onFlip={(event: { data: number }) => setCurrentPage(event.data)}
        >
          {pageAssets.map((pageAsset, pageIndex) => (
            <BookPage
              key={pageAsset.src}
              src={pageAsset.src}
              pageNumber={pageAsset.pageNumber}
              isCover={pageIndex === 0}
            />
          ))}
        </HTMLFlipBook>
      </div>
    </section>
  );
}
