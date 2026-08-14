import { describe, expect, it } from 'vitest';
import { normalizeFrontmatter } from '@/docs/frontmatter';
import {
  buildSectionSummary,
  buildYearSummary,
  collectSectionSlugs,
  collectYearSlugs,
  DEFAULT_SECTION_ORDER,
  findSectionByTab,
  parseDocTabPath,
  parseSectionMetaPath,
  parseYearMetaPath,
  resolveSectionSlug,
  sortDocTabs,
  sortSectionSlugs,
} from '@/docs/registry.utils';

describe('parseDocTabPath', () => {
  it('accepts year/section/tab paths', () => {
    expect(parseDocTabPath('./mehregan26/exam/01-first-round.mdx')).toEqual({
      year: 'mehregan26',
      section: 'exam',
      tab: '01-first-round',
    });
  });

  it('rejects flat year/tab paths', () => {
    expect(parseDocTabPath('./mehregan26/01-first-round.mdx')).toBeNull();
  });

  it('rejects deeper nested paths', () => {
    expect(parseDocTabPath('./mehregan26/exam/extra/intro.mdx')).toBeNull();
  });
});

describe('parseYearMetaPath', () => {
  it('reads the year slug', () => {
    expect(parseYearMetaPath('./mehregan26/meta.ts')).toBe('mehregan26');
  });

  it('rejects section meta paths', () => {
    expect(parseYearMetaPath('./mehregan26/exam/meta.ts')).toBeNull();
  });
});

describe('parseSectionMetaPath', () => {
  it('reads year and section slugs', () => {
    expect(parseSectionMetaPath('./mehregan26/exam/meta.ts')).toEqual({
      year: 'mehregan26',
      section: 'exam',
    });
  });
});

describe('sortDocTabs', () => {
  it('sorts alphabetically without tabOrder', () => {
    expect(sortDocTabs(['props', 'usage'])).toEqual(['props', 'usage']);
  });

  it('respects tabOrder and appends unknown tabs', () => {
    expect(sortDocTabs(['props', 'usage', 'extra'], ['usage', 'props'])).toEqual([
      'usage',
      'props',
      'extra',
    ]);
  });
});

describe('sortSectionSlugs', () => {
  it('uses the default exam / virtual / summer-camp order', () => {
    expect(sortSectionSlugs(['summer-camp', 'exam', 'virtual'])).toEqual(DEFAULT_SECTION_ORDER);
  });

  it('appends unknown sections after the known order', () => {
    expect(sortSectionSlugs(['workshop', 'exam', 'summer-camp'])).toEqual([
      'exam',
      'summer-camp',
      'workshop',
    ]);
  });
});

describe('resolveSectionSlug', () => {
  it('maps the legacy course slug to summer-camp', () => {
    expect(resolveSectionSlug('course')).toBe('summer-camp');
  });

  it('leaves current slugs unchanged', () => {
    expect(resolveSectionSlug('summer-camp')).toBe('summer-camp');
    expect(resolveSectionSlug('exam')).toBe('exam');
  });
});

describe('normalizeFrontmatter', () => {
  it('keeps string title and description', () => {
    expect(normalizeFrontmatter({ title: 'عنوان', description: 'توضیح' })).toEqual({
      title: 'عنوان',
      description: 'توضیح',
    });
  });

  it('drops non-string fields', () => {
    expect(normalizeFrontmatter({ title: 42, description: true })).toEqual({});
  });
});

describe('buildSectionSummary', () => {
  it('prefers meta title over first tab frontmatter', () => {
    const summary = buildSectionSummary(
      'mehregan26',
      'exam',
      { title: 'آزمون‌ها', tabOrder: ['first'] },
      ['first'],
      { first: { title: 'مرحله اول' } },
    );
    expect(summary?.title).toBe('آزمون‌ها');
    expect(summary?.tabLabels.first).toBe('مرحله اول');
  });

  it('returns null when there are no tabs', () => {
    expect(buildSectionSummary('mehregan26', 'exam', undefined, [], {})).toBeNull();
  });

  it('falls back to default section titles', () => {
    const summary = buildSectionSummary('mehregan25', 'summer-camp', undefined, ['1'], {
      '1': { title: 'روز اول' },
    });
    expect(summary?.title).toBe('دوره تابستان');
  });
});

describe('buildYearSummary', () => {
  it('uses the first section as default', () => {
    const exam = buildSectionSummary('mehregan26', 'exam', { title: 'آزمون‌ها' }, ['first'], {
      first: { title: 'مرحله اول' },
    });
    const summary = buildYearSummary('mehregan26', { title: 'بیست و ششمین دوره' }, [exam!]);
    expect(summary?.defaultSection).toBe('exam');
    expect(summary?.title).toBe('بیست و ششمین دوره');
  });

  it('returns null when there are no sections', () => {
    expect(buildYearSummary('mehregan26', { title: 'خالی' }, [])).toBeNull();
  });
});

describe('collectYearSlugs', () => {
  it('merges slugs from year meta and mdx paths', () => {
    expect(
      collectYearSlugs(
        ['./mehregan26/meta.ts'],
        ['./mehregan25/summer-camp/1.mdx', './mehregan26/exam/01-first-round.mdx'],
      ),
    ).toEqual(expect.arrayContaining(['mehregan25', 'mehregan26']));
  });
});

describe('collectSectionSlugs', () => {
  it('collects sections for one year only', () => {
    expect(
      collectSectionSlugs(
        'mehregan26',
        ['./mehregan26/exam/meta.ts', './mehregan25/summer-camp/meta.ts'],
        ['./mehregan26/virtual/talks.mdx', './mehregan25/summer-camp/1.mdx'],
      ),
    ).toEqual(expect.arrayContaining(['exam', 'virtual']));
  });
});

describe('findSectionByTab', () => {
  it('finds the section that owns a legacy tab slug', () => {
    const exam = buildSectionSummary(
      'mehregan26',
      'exam',
      { title: 'آزمون‌ها' },
      ['01-first-round'],
      {
        '01-first-round': { title: 'مرحله اول' },
      },
    );
    expect(findSectionByTab([exam!], '01-first-round')?.slug).toBe('exam');
  });
});
