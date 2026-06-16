import { useRouteError } from 'react-router-dom';
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function RouteErrorBoundary() {
  const error = useRouteError() as any;

  useEffect(() => {
    // Check if it's a chunk loading/dynamic import error
    const isChunkError =
      error &&
      (error.message?.includes('Failed to fetch dynamically imported module') ||
        error.stack?.includes('Failed to fetch dynamically imported module') ||
        error.message?.includes('ChunkLoadError') ||
        (error.name === 'TypeError' && error.message?.includes('import')));

    if (isChunkError) {
      console.warn('Chunk load error detected, reloading page to fetch latest version...');
      // Force reload to get the latest build
      window.location.reload();
    }
  }, [error]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[#090f1d] p-6 text-center text-white relative overflow-hidden"
      dir="rtl"
      lang="fa"
    >
      {/* Decorative background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-red-950/40 border border-red-500/30 rounded-2xl flex items-center justify-center mb-6 text-red-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-slate-100 mb-3 font-sans">خطایی رخ داده است</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          مشکلی در بارگذاری این صفحه پیش آمده است. این خطا معمولاً به دلیل به‌روزرسانی سایت رخ
          می‌دهد و با یک‌بار بارگذاری مجدد برطرف می‌شود.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-red-950/20 flex items-center justify-center gap-2 group hover:scale-[1.01]"
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>بارگذاری مجدد صفحه</span>
        </button>

        {import.meta.env.DEV && error && (
          <div className="mt-8 text-right">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Error Details:
            </span>
            <pre className="p-4 bg-black/40 border border-slate-800 rounded-xl text-left text-xs font-mono overflow-auto max-h-40 text-red-400/90 whitespace-pre-wrap select-text">
              {error.message || String(error)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
