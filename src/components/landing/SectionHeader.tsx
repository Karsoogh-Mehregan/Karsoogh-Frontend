import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  icon: LucideIcon;
}

export function SectionHeader({ eyebrow, title, description, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <span className="lab-kicker">
        <Icon size={15} aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-sm leading-8 text-slate-300 md:text-base">{description}</p>
      )}
    </div>
  );
}
