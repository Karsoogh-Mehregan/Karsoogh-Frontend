export type YearMeta = {
  title?: string;
  description?: string;
  /** Larger numbers appear first (e.g. 26 before 25). */
  order?: number;
  /** Preferred section slugs for this year; unknown sections are appended. */
  sectionOrder?: string[];
  isVisible?: boolean;
};

export type SectionMeta = {
  title?: string;
  description?: string;
  tabOrder?: string[];
  tabLabels?: Record<string, string>;
  isVisible?: boolean;
};

export type SectionSummary = {
  year: string;
  slug: string;
  title: string;
  description?: string;
  tabs: string[];
  tabLabels: Record<string, string>;
  defaultTab: string;
};

export type YearSummary = {
  slug: string;
  title: string;
  description?: string;
  order?: number;
  sections: SectionSummary[];
  defaultSection: string;
};
