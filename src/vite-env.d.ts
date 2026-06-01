/// <reference types="vite/client" />

import type { MdxFrontmatter } from '@/docs/frontmatter';
import type { FC } from 'react';
import type { MDXProps } from 'mdx/types';

declare module '*.mdx' {
  export const frontmatter: MdxFrontmatter;
  const MDXComponent: FC<MDXProps>;
  export default MDXComponent;
}
