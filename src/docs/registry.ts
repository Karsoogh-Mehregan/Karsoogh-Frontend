import type { ComponentType } from 'react';
import { normalizeFrontmatter, type MdxFrontmatter } from '@/docs/frontmatter';
import type { DocMeta, DocSummary } from '@/docs/types';
import {
  buildDocSummary,
  collectSlugsFromPaths,
  parseDocTabPath,
  sortDocSummaries,
  sortDocTabs,
} from '@/docs/registry.utils';

export type MdxModule = {
  default: ComponentType;
  frontmatter?: unknown;
};

const mdxEagerModules = import.meta.glob<MdxModule>('./*/**/*.mdx', { eager: true });

const metaModules = import.meta.glob<{ meta: DocMeta }>('./*/meta.ts', {
  eager: true,
});

const validMdxPaths = Object.keys(mdxEagerModules).filter((path) => {
  const valid = parseDocTabPath(path) !== null;
  if (!valid && import.meta.env.DEV) {
    console.warn(
      `[docs] Ignoring MDX path "${path}". Expected: src/docs/<slug>/<tab>.mdx (no nested folders).`,
    );
  }
  return valid;
});

export function getDocMeta(docName: string): DocMeta | undefined {
  return metaModules[`./${docName}/meta.ts`]?.meta;
}

function buildDocCache(): { allDocs: DocSummary[]; summaryBySlug: Map<string, DocSummary> } {
  const slugs = collectSlugsFromPaths(Object.keys(metaModules), validMdxPaths);
  const summaryBySlug = new Map<string, DocSummary>();
  const allDocs: DocSummary[] = [];

  for (const slug of slugs) {
    const meta = getDocMeta(slug);

    if (!meta?.isVisible) {
      continue;
    }

    const prefix = `./${slug}/`;
    const tabIds = validMdxPaths
      .filter((path) => path.startsWith(prefix))
      .map((path) => parseDocTabPath(path)!.tab);

    const tabs = sortDocTabs(tabIds, meta?.tabOrder);
    const frontmatterByTab = Object.fromEntries(
      tabs.map((tab) => {
        const path = getMdxModulePath(slug, tab);
        return [tab, normalizeFrontmatter(mdxEagerModules[path]?.frontmatter)];
      }),
    ) as Record<string, MdxFrontmatter>;

    const summary = buildDocSummary(slug, meta, tabs, frontmatterByTab);
    if (summary) {
      summaryBySlug.set(slug, summary);
      allDocs.push(summary);
    }
  }

  return { allDocs: sortDocSummaries(allDocs), summaryBySlug };
}

const docCache = buildDocCache();

/** فهرست مستندات — یک‌بار در زمان بارگذاری ماژول محاسبه می‌شود */
export const allDocs = docCache.allDocs;

export function getDocSummary(docName: string): DocSummary | undefined {
  return docCache.summaryBySlug.get(docName);
}

export function getMdxFrontmatter(modulePath: string): MdxFrontmatter {
  return normalizeFrontmatter(mdxEagerModules[modulePath]?.frontmatter);
}

/** کامپوننت‌های MDX از قبل در زمان بارگذاری ماژول ثبت شده‌اند */
export const mdxComponentsByPath = Object.fromEntries(
  validMdxPaths.map((path) => [path, mdxEagerModules[path].default]),
) as Record<string, ComponentType>;

export function getMdxComponent(modulePath: string): ComponentType | undefined {
  return mdxComponentsByPath[modulePath];
}

export function getDocTabs(docName: string | undefined): string[] {
  if (!docName) return [];
  return getDocSummary(docName)?.tabs ?? [];
}

export function getMdxModulePath(docName: string, tabName: string): string {
  return `./${docName}/${tabName}.mdx`;
}

export function getTabLabel(docName: string, tab: string): string {
  return getDocSummary(docName)?.tabLabels[tab] ?? tab;
}

export function getDocTitle(docName: string): string {
  return getDocSummary(docName)?.title ?? docName;
}

export function getDocDescription(docName: string): string | undefined {
  return getDocSummary(docName)?.description;
}
