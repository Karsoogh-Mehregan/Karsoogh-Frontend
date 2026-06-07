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

  if (!docName || availableTabs.length === 0) {
    return <Navigate to="/docs" replace />;
  }

  return (
    <div className="lab-container pt-32 md:pt-40 pb-14 sm:pb-20 font-secondary">
      <header className="mb-8 text-right">
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
  );
}
