import type { ComponentType } from 'react';
import { normalizeFrontmatter, type MdxFrontmatter } from '@/docs/frontmatter';
import type { SectionMeta, SectionSummary, YearMeta, YearSummary } from '@/docs/types';
import {
  buildSectionSummary,
  buildYearSummary,
  collectSectionSlugs,
  collectYearSlugs,
  findSectionByTab,
  parseDocTabPath,
  resolveSectionSlug,
  sortDocTabs,
  sortSectionSlugs,
  sortYearSummaries,
} from '@/docs/registry.utils';

export { resolveSectionSlug };

export type MdxModule = {
  default: ComponentType;
  frontmatter?: unknown;
};

const mdxEagerModules = import.meta.glob<MdxModule>('./*/*/*.mdx', { eager: true });

const yearMetaModules = import.meta.glob<{ meta: YearMeta }>('./*/meta.ts', {
  eager: true,
});

const sectionMetaModules = import.meta.glob<{ meta: SectionMeta }>('./*/*/meta.ts', {
  eager: true,
});

const validMdxPaths = Object.keys(mdxEagerModules).filter((path) => {
  const valid = parseDocTabPath(path) !== null;
  if (!valid && import.meta.env.DEV) {
    console.warn(
      `[docs] Ignoring MDX path "${path}". Expected: src/docs/<year>/<section>/<tab>.mdx.`,
    );
  }
  return valid;
});

export function getYearMeta(year: string): YearMeta | undefined {
  return yearMetaModules[`./${year}/meta.ts`]?.meta;
}

export function getSectionMeta(year: string, section: string): SectionMeta | undefined {
  return sectionMetaModules[`./${year}/${section}/meta.ts`]?.meta;
}

function buildDocCache(): {
  allYears: YearSummary[];
  yearBySlug: Map<string, YearSummary>;
  sectionByKey: Map<string, SectionSummary>;
} {
  const years = collectYearSlugs(Object.keys(yearMetaModules), validMdxPaths);
  const yearBySlug = new Map<string, YearSummary>();
  const sectionByKey = new Map<string, SectionSummary>();
  const allYears: YearSummary[] = [];

  for (const year of years) {
    const yearMeta = getYearMeta(year);
    if (!yearMeta?.isVisible) continue;

    const sectionSlugs = sortSectionSlugs(
      collectSectionSlugs(year, Object.keys(sectionMetaModules), validMdxPaths),
      yearMeta.sectionOrder,
    );

    const sections: SectionSummary[] = [];

    for (const section of sectionSlugs) {
      const sectionMeta = getSectionMeta(year, section);
      if (sectionMeta?.isVisible === false) continue;

      const prefix = `./${year}/${section}/`;
      const tabIds = validMdxPaths
        .filter((path) => path.startsWith(prefix))
        .map((path) => parseDocTabPath(path)!.tab);

      const tabs = sortDocTabs(tabIds, sectionMeta?.tabOrder);
      const frontmatterByTab = Object.fromEntries(
        tabs.map((tab) => {
          const path = getMdxModulePath(year, section, tab);
          return [tab, normalizeFrontmatter(mdxEagerModules[path]?.frontmatter)];
        }),
      ) as Record<string, MdxFrontmatter>;

      const summary = buildSectionSummary(year, section, sectionMeta, tabs, frontmatterByTab);
      if (!summary) continue;

      sections.push(summary);
      sectionByKey.set(sectionKey(year, section), summary);
    }

    const yearSummary = buildYearSummary(year, yearMeta, sections);
    if (!yearSummary) continue;

    yearBySlug.set(year, yearSummary);
    allYears.push(yearSummary);
  }

  return { allYears: sortYearSummaries(allYears), yearBySlug, sectionByKey };
}

const docCache = buildDocCache();

export const allYears = docCache.allYears;

export function getYearSummary(year: string): YearSummary | undefined {
  return docCache.yearBySlug.get(year);
}

export function getSectionSummary(year: string, section: string): SectionSummary | undefined {
  return docCache.sectionByKey.get(sectionKey(year, section));
}

export function getMdxFrontmatter(modulePath: string): MdxFrontmatter {
  return normalizeFrontmatter(mdxEagerModules[modulePath]?.frontmatter);
}

export const mdxComponentsByPath = Object.fromEntries(
  validMdxPaths.map((path) => [path, mdxEagerModules[path].default]),
) as Record<string, ComponentType>;

export function getMdxComponent(modulePath: string): ComponentType | undefined {
  return mdxComponentsByPath[modulePath];
}

export function getSectionTabs(year: string | undefined, section: string | undefined): string[] {
  if (!year || !section) return [];
  return getSectionSummary(year, section)?.tabs ?? [];
}

export function getMdxModulePath(year: string, section: string, tabName: string): string {
  return `./${year}/${section}/${tabName}.mdx`;
}

export function getTabLabel(year: string, section: string, tab: string): string {
  return getSectionSummary(year, section)?.tabLabels[tab] ?? tab;
}

export function getYearTitle(year: string): string {
  return getYearSummary(year)?.title ?? year;
}

export function getSectionTitle(year: string, section: string): string {
  return getSectionSummary(year, section)?.title ?? section;
}

export function getSectionDescription(year: string, section: string): string | undefined {
  return getSectionSummary(year, section)?.description;
}

/** Old `/docs/:year/:tab` URLs still resolve to the section that owns that tab. */
export function resolveLegacySection(year: string, maybeTab: string): SectionSummary | undefined {
  const yearSummary = getYearSummary(year);
  if (!yearSummary) return undefined;
  return findSectionByTab(yearSummary.sections, maybeTab);
}

function sectionKey(year: string, section: string): string {
  return `${year}/${section}`;
}
