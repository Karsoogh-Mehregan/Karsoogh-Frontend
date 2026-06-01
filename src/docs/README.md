# MDX documentation

## Folder structure

```
src/docs/
  <slug>/           ← doc name in the URL: /docs/<slug>/...
    meta.ts         ← optional: doc title, description, tab order
    <tab>.mdx       ← one file = one tab
    images/         ← relative images (optional)
```

**Important:** Only one folder level under `docs/` is supported.

- ✅ `src/docs/button/usage.mdx`
- ❌ `src/docs/guides/react/intro.mdx` (ignored + dev console warning)

## Frontmatter in each MDX file

```mdx
---
title: 'Tab title'
description: 'Short text shown under the page header'
---

## Content heading

Your content…
```

- `#` in MDX renders as `<h2>` (the page shell uses `<h1>` from `meta.ts` or the first tab’s frontmatter).
- Images: use `import img from '@/assets/...'` or a relative path like `./images/x.png` — `@/` does **not** work inside `![](...)`.
