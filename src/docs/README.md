# MDX documentation

## Folder structure

```
src/docs/
  <year>/                 ← year in the URL: /docs/<year>
    meta.ts               ← year title, description, section order
    <section>/            ← section in the URL: /docs/<year>/<section>/...
      meta.ts             ← optional: section title, tab order
      <tab>.mdx           ← one file = one tab
      images/             ← relative images (optional)
```

Shared section slugs (add more folders anytime; unknown ones just append):

- `exam` — آزمون‌ها
- `virtual` — ارائه‌های مجازی
- `summer-camp` — دوره تابستان

Legacy URL alias: `/docs/:year/course/...` redirects to `/docs/:year/summer-camp/...`.

A section appears only when it has at least one MDX tab. Empty placeholders are not required.

**Important:** Exactly two folder levels under `docs/` are supported for MDX.

- ✅ `src/docs/mehregan26/exam/01-first-round.mdx`
- ❌ `src/docs/mehregan26/01-first-round.mdx` (too shallow)
- ❌ `src/docs/mehregan26/exam/extra/intro.mdx` (too nested)

## Frontmatter in each MDX file

```mdx
---
title: 'Tab title'
description: 'Short text shown under the page header'
---

## Content heading

Your content…
```

- `#` in MDX renders as `<h2>` (the page shell uses `<h1>` from section `meta.ts` or the first tab’s frontmatter).
- Images: use `import img from '@/assets/...'` or a relative path like `./images/x.png` — `@/` does **not** work inside `![](...)`.
