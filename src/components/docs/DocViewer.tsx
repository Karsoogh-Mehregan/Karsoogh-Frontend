import { Link, Navigate, useParams } from 'react-router-dom';
import {
  getDocTabs,
  getDocTitle,
  getMdxFrontmatter,
  getMdxModulePath,
  getTabLabel,
} from '@/docs/registry';
import MdxTabPanel from '@/components/docs/MdxTabPanel';

export default function DocViewer() {
  const { docName, tabName } = useParams<{ docName: string; tabName?: string }>();
  const availableTabs = getDocTabs(docName);
  const activeTab =
    docName && tabName && availableTabs.includes(tabName) ? tabName : (availableTabs[0] ?? '');
  const modulePath = docName && activeTab ? getMdxModulePath(docName, activeTab) : '';
  const tabFrontmatter = modulePath ? getMdxFrontmatter(modulePath) : {};

  if (!docName) {
    return <Navigate to="/docs" replace />;
  }

  if (availableTabs.length === 0) {
    return <Navigate to="/docs" replace />;
  }

  if (!tabName || !availableTabs.includes(tabName)) {
    return <Navigate to={`/docs/${docName}/${activeTab}`} replace />;
  }

  return (
    <div className="lab-shell min-h-screen font-secondary" dir="rtl" lang="fa">
      <div className="lab-container py-10 sm:py-14">
        <header className="mb-8 text-right">
          {/* <Link
            to="/docs"
            className="mb-4 inline-flex cursor-pointer items-center gap-1 text-sm font-bold text-cyan-200 transition hover:text-cyan-100"
          >
            بازگشت
          </Link> */}
          {/* <p className="lab-kicker mb-3">مستندات</p> */}
          <Link to="/docs" className="lab-kicker mb-3 transition hover:text-white">
            بازگشت
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {getDocTitle(docName)}
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
          aria-label={`بخش‌های مستند ${getDocTitle(docName)}`}
        >
          {availableTabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <Link
                key={tab}
                to={`/docs/${docName}/${tab}`}
                className={
                  isActive
                    ? 'lab-button-primary min-h-11 cursor-pointer px-4 py-2.5 text-sm'
                    : 'lab-button-ghost min-h-11 cursor-pointer px-4 py-2.5 text-sm text-slate-300'
                }
                aria-current={isActive ? 'page' : undefined}
              >
                {getTabLabel(docName, tab)}
              </Link>
            );
          })}
        </nav>

        <article className="lab-card p-6 text-right sm:p-8">
          <MdxTabPanel key={modulePath} modulePath={modulePath} />
        </article>
      </div>
    </div>
  );
}
