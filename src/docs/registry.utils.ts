import type { MdxFrontmatter } from '@/docs/frontmatter';
import type { SectionMeta, SectionSummary, YearMeta, YearSummary } from '@/docs/types';

/** `src/docs/<year>/<section>/<tab>.mdx` */
export const DOC_TAB_MDX_PATTERN = /^\.\/([^/]+)\/([^/]+)\/([^/]+)\.mdx$/;

/** Shared section order so new years stay aligned; extra folders append. */
export const DEFAULT_SECTION_ORDER = ['exam', 'virtual', 'course'];

export function parseDocTabPath(
  path: string,
): { year: string; section: string; tab: string } | null {
  const match = path.match(DOC_TAB_MDX_PATTERN);
  if (!match) return null;
  return { year: match[1], section: match[2], tab: match[3] };
}

export function parseYearMetaPath(path: string): string | null {
  const match = path.match(/^\.\/([^/]+)\/meta\.ts$/);
  return match ? match[1] : null;
}

export function parseSectionMetaPath(path: string): { year: string; section: string } | null {
  const match = path.match(/^\.\/([^/]+)\/([^/]+)\/meta\.ts$/);
  if (!match) return null;
  return { year: match[1], section: match[2] };
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

export function sortSectionSlugs(slugs: string[], sectionOrder?: string[]): string[] {
  const order = sectionOrder?.length ? sectionOrder : DEFAULT_SECTION_ORDER;

  return [...slugs].sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export function buildTabLabels(
  tabs: string[],
  meta: SectionMeta | undefined,
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

export function buildSectionSummary(
  year: string,
  slug: string,
  meta: SectionMeta | undefined,
  tabs: string[],
  frontmatterByTab: Record<string, MdxFrontmatter>,
): SectionSummary | null {
  if (tabs.length === 0) return null;

  const tabLabels = buildTabLabels(tabs, meta, frontmatterByTab);
  const firstTab = tabs[0];
  const firstFm = frontmatterByTab[firstTab];

  return {
    year,
    slug,
    title: meta?.title ?? firstFm?.title ?? slug,
    description: meta?.description ?? firstFm?.description,
    tabs,
    tabLabels,
    defaultTab: firstTab,
  };
}

export function buildYearSummary(
  slug: string,
  meta: YearMeta | undefined,
  sections: SectionSummary[],
): YearSummary | null {
  if (sections.length === 0) return null;

  return {
    slug,
    title: meta?.title ?? slug,
    description: meta?.description,
    order: meta?.order,
    sections,
    defaultSection: sections[0].slug,
  };
}

export function collectYearSlugs(yearMetaPaths: string[], mdxPaths: string[]): string[] {
  const slugs = new Set<string>();

  for (const path of yearMetaPaths) {
    const year = parseYearMetaPath(path);
    if (year) slugs.add(year);
  }

  for (const path of mdxPaths) {
    const parsed = parseDocTabPath(path);
    if (parsed) slugs.add(parsed.year);
  }

  return [...slugs];
}

export function collectSectionSlugs(
  year: string,
  sectionMetaPaths: string[],
  mdxPaths: string[],
): string[] {
  const slugs = new Set<string>();

  for (const path of sectionMetaPaths) {
    const parsed = parseSectionMetaPath(path);
    if (parsed?.year === year) slugs.add(parsed.section);
  }

  for (const path of mdxPaths) {
    const parsed = parseDocTabPath(path);
    if (parsed?.year === year) slugs.add(parsed.section);
  }

  return [...slugs];
}

export function sortYearSummaries(summaries: YearSummary[]): YearSummary[] {
  return [...summaries].sort((a, b) => {
    const ao = a.order ?? Number.NEGATIVE_INFINITY;
    const bo = b.order ?? Number.NEGATIVE_INFINITY;
    if (ao !== bo) return bo - ao;
    return a.title.localeCompare(b.title, 'fa');
  });
}

export function findSectionByTab(
  sections: SectionSummary[],
  tab: string,
): SectionSummary | undefined {
  return sections.find((section) => section.tabs.includes(tab));
}
