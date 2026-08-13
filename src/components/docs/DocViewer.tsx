import { Link, Navigate, useParams } from 'react-router';
import {
  getSectionSummary,
  getSectionTabs,
  getSectionTitle,
  getYearSummary,
  getYearTitle,
  getMdxFrontmatter,
  getMdxModulePath,
  getTabLabel,
  resolveLegacySection,
} from '@/docs/registry';
import MdxTabPanel from '@/components/docs/MdxTabPanel';

export default function DocViewer() {
  const { year, section, tabName } = useParams<{
    year: string;
    section: string;
    tabName?: string;
  }>();

  if (!year || !section) {
    return <Navigate to="/docs" replace />;
  }

  const yearSummary = getYearSummary(year);
  if (!yearSummary) {
    return <Navigate to="/docs" replace />;
  }

  const sectionSummary = getSectionSummary(year, section);
  if (!sectionSummary) {
    const legacy = resolveLegacySection(year, section);
    if (legacy) {
      return <Navigate to={`/docs/${year}/${legacy.slug}/${section}`} replace />;
    }
    return <Navigate to={`/docs/${year}`} replace />;
  }

  const availableTabs = getSectionTabs(year, section);
  const activeTab =
    tabName && availableTabs.includes(tabName) ? tabName : sectionSummary.defaultTab;

  if (tabName && tabName !== activeTab) {
    return <Navigate to={`/docs/${year}/${section}/${activeTab}`} replace />;
  }

  if (!tabName) {
    return <Navigate to={`/docs/${year}/${section}/${activeTab}`} replace />;
  }

  const modulePath = getMdxModulePath(year, section, activeTab);
  const tabFrontmatter = getMdxFrontmatter(modulePath);

  return (
    <div className="lab-container pt-32 md:pt-40 pb-14 sm:pb-20 font-secondary">
      <header className="mb-8 text-right">
        <p className="mb-3 text-sm font-bold text-slate-400">
          <Link to="/docs" className="transition hover:text-cyan-200">
            فهرست مستندات
          </Link>
          <span className="mx-2 text-slate-600">/</span>
          <Link to={`/docs/${year}`} className="transition hover:text-cyan-200">
            {getYearTitle(year)}
          </Link>
        </p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          {getSectionTitle(year, section)}
        </h1>
        {tabFrontmatter.description ? (
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-400">
            {tabFrontmatter.description}
          </p>
        ) : null}
      </header>

      <nav
        className="lab-card mb-8 flex flex-wrap justify-start gap-2 p-2"
        dir="rtl"
        aria-label={`بخش‌های ${getSectionTitle(year, section)}`}
      >
        {availableTabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <Link
              key={tab}
              to={`/docs/${year}/${section}/${tab}`}
              className={
                isActive
                  ? 'lab-button-primary min-h-11 cursor-pointer px-4 py-2.5 text-sm'
                  : 'lab-button-ghost min-h-11 cursor-pointer px-4 py-2.5 text-sm text-slate-300'
              }
              aria-current={isActive ? 'page' : undefined}
            >
              {getTabLabel(year, section, tab)}
            </Link>
          );
        })}
      </nav>

      <article className="lab-card p-6 text-right sm:p-8">
        <MdxTabPanel key={modulePath} modulePath={modulePath} />
      </article>
    </div>
  );
}
