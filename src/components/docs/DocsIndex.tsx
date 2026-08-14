import { allYears } from '@/docs/registry';
import DocsEntryCard from '@/components/docs/DocsEntryCard';

export default function DocsIndex() {
  const years = allYears;

  return (
    <div className="lab-container pt-32 md:pt-40 pb-14 sm:pb-20 font-secondary">
      <header className="mb-10 text-right">
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">فهرست مستندات</h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-400">
          همه دوره‌های کارسوق که برایشان مستند ثبت شده، اینجا فهرست شده‌اند.
        </p>
      </header>

      {years.length === 0 ? (
        <div className="lab-card p-8 text-center">
          <p className="text-lg font-bold text-white">هنوز مستندی ثبت نشده است.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {years.map((year) => (
            <li key={year.slug}>
              <DocsEntryCard
                to={`/docs/${year.slug}`}
                title={year.title}
                description={year.description}
                chips={year.sections.map((section) => section.title)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
