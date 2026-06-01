import { describe, expect, it } from 'vitest';
import { normalizeFrontmatter } from '@/docs/frontmatter';
import {
  buildDocSummary,
  collectSlugsFromPaths,
  parseDocTabPath,
  sortDocTabs,
} from '@/docs/registry.utils';

describe('parseDocTabPath', () => {
  it('accepts flat doc/tab paths', () => {
    expect(parseDocTabPath('./button/first.mdx')).toEqual({ slug: 'button', tab: 'first' });
  });

  it('rejects nested paths', () => {
    expect(parseDocTabPath('./guides/react/intro.mdx')).toBeNull();
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

describe('buildDocSummary', () => {
  it('prefers meta title over first tab frontmatter', () => {
    const summary = buildDocSummary(
      'button',
      { title: 'از meta', tabOrder: ['first'] },
      ['first'],
      { first: { title: 'از frontmatter' } },
    );
    expect(summary?.title).toBe('از meta');
    expect(summary?.tabLabels.first).toBe('از frontmatter');
  });

  it('returns null when there are no tabs', () => {
    expect(buildDocSummary('empty', undefined, [], {})).toBeNull();
  });
});

describe('collectSlugsFromPaths', () => {
  it('merges slugs from meta and mdx paths', () => {
    expect(
      collectSlugsFromPaths(['./button/meta.ts'], ['./button/first.mdx', './test/first.mdx']),
    ).toEqual(expect.arrayContaining(['button', 'test']));
  });
});
