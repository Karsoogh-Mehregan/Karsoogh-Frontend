export type MdxFrontmatter = {
  title?: string;
  description?: string;
};

export function normalizeFrontmatter(raw: unknown): MdxFrontmatter {
  if (!raw || typeof raw !== 'object') return {};

  const data = raw as Record<string, unknown>;
  return {
    title: typeof data.title === 'string' ? data.title : undefined,
    description: typeof data.description === 'string' ? data.description : undefined,
  };
}
