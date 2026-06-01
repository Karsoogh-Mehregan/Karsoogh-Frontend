import type { MdxFrontmatter } from '@/docs/frontmatter';
import type { DocMeta, DocSummary } from '@/docs/types';

/** فقط `src/docs/<slug>/<tab>.mdx` — بدون زیرپوشه */
export const DOC_TAB_MDX_PATTERN = /^\.\/([^/]+)\/([^/]+)\.mdx$/;

export function parseDocTabPath(path: string): { slug: string; tab: string } | null {
  const match = path.match(DOC_TAB_MDX_PATTERN);
  if (!match) return null;
  return { slug: match[1], tab: match[2] };
}

export function sortDocTabs(tabs: string[], tabOrder?: string[]): string[] {
  if (!tabOrder?.length) return [...tabs].sort();

  return [...tabs].sort((a, b) => {
    const ai = tabOrder.indexOf(a);
    const bi = tabOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export function buildTabLabels(
  tabs: string[],
  meta: DocMeta | undefined,
  frontmatterByTab: Record<string, MdxFrontmatter>,
): Record<string, string> {
  return Object.fromEntries(
    tabs.map((tab) => {
      const fm = frontmatterByTab[tab];
      const label = fm?.title ?? meta?.tabLabels?.[tab] ?? tab;
      return [tab, label];
    }),
  );
}

export function buildDocSummary(
  slug: string,
  meta: DocMeta | undefined,
  tabs: string[],
  frontmatterByTab: Record<string, MdxFrontmatter>,
): DocSummary | null {
  if (tabs.length === 0) return null;

  const tabLabels = buildTabLabels(tabs, meta, frontmatterByTab);
  const firstTab = tabs[0];
  const firstFm = frontmatterByTab[firstTab];

  return {
    slug,
    title: meta?.title ?? firstFm?.title ?? slug,
    description: meta?.description ?? firstFm?.description,
    tabs,
    tabLabels,
    defaultTab: firstTab,
  };
}

export function collectSlugsFromPaths(metaPaths: string[], mdxPaths: string[]): string[] {
  const slugs = new Set<string>();

  for (const path of metaPaths) {
    const match = path.match(/^\.\/([^/]+)\/meta\.ts$/);
    if (match) slugs.add(match[1]);
  }

  for (const path of mdxPaths) {
    const parsed = parseDocTabPath(path);
    if (parsed) slugs.add(parsed.slug);
  }

  return [...slugs];
}

export function sortDocSummaries(summaries: DocSummary[]): DocSummary[] {
  return [...summaries].sort((a, b) => a.title.localeCompare(b.title, 'fa'));
}
