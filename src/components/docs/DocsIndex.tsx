import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { allDocs } from '@/docs/registry';

export default function DocsIndex() {
  const docs = allDocs;

  return (
    <div className="lab-shell min-h-screen font-secondary" dir="rtl" lang="fa">
      <div className="lab-container py-10 sm:py-14">
        <header className="mb-10 text-right">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            فهرست مستندات
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-400">
            همه مستندات موجود در این بخش فهرست شده‌اند.
          </p>
        </header>

        {docs.length === 0 ? (
          <div className="lab-card p-8 text-center">
            <p className="text-lg font-bold text-white">هنوز مستندی ثبت نشده است.</p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  to={`/docs/${doc.slug}/${doc.defaultTab}`}
                  className="lab-card group flex h-full cursor-pointer flex-col p-6 text-right transition duration-200 hover:border-cyan-300/30 hover:bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-black text-white transition-colors group-hover:text-cyan-100">
                      {doc.title}
                    </h2>
                    <ChevronLeft
                      className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-cyan-200"
                      aria-hidden
                    />
                  </div>

                  {doc.description ? (
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
                      {doc.description}
                    </p>
                  ) : null}

                  <ul className="mt-4 flex flex-wrap justify-start gap-2">
                    {doc.tabs.map((tab) => (
                      <li
                        key={tab}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-slate-300"
                      >
                        {doc.tabLabels[tab]}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 text-center">
          <Link to="/" className="lab-button-ghost inline-flex cursor-pointer text-sm">
            بازگشت به خانه
          </Link>
        </p>
      </div>
    </div>
  );
}
