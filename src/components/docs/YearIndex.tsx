import { Link, Navigate, useParams } from 'react-router';
import { getYearSummary } from '@/docs/registry';
import DocsEntryCard from '@/components/docs/DocsEntryCard';

export default function YearIndex() {
  const { year } = useParams<{ year: string }>();
  const summary = year ? getYearSummary(year) : undefined;

  if (!summary) {
    return <Navigate to="/docs" replace />;
  }

  return (
    <div className="lab-container pt-32 md:pt-40 pb-14 sm:pb-20 font-secondary">
      <header className="mb-10 text-right">
        <p className="mb-3 text-sm font-bold text-slate-400">
          <Link to="/docs" className="transition hover:text-cyan-200">
            فهرست مستندات
          </Link>
        </p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          {summary.title}
        </h1>
        {summary.description ? (
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-400">{summary.description}</p>
        ) : null}
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summary.sections.map((section) => (
          <li key={section.slug}>
            <DocsEntryCard
              to={`/docs/${summary.slug}/${section.slug}/${section.defaultTab}`}
              title={section.title}
              description={section.description}
              chips={section.tabs.map((tab) => section.tabLabels[tab])}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
