export type DocMeta = {
  title?: string;
  description?: string;
  tabOrder?: string[];
  tabLabels?: Record<string, string>;
  isVisible?: boolean;
};

export type DocSummary = {
  slug: string;
  title: string;
  description?: string;
  tabs: string[];
  tabLabels: Record<string, string>;
  defaultTab: string;
};
