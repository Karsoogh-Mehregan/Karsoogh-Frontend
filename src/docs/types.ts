export type DocMeta = {
  /** عنوان کل مستند (صفحه فهرست و هدر DocViewer) */
  title?: string;
  description?: string;
  tabOrder?: string[];
  /** فقط وقتی در MDX frontmatter نیست */
  tabLabels?: Record<string, string>;
};

export type DocSummary = {
  slug: string;
  title: string;
  description?: string;
  tabs: string[];
  tabLabels: Record<string, string>;
  defaultTab: string;
};
