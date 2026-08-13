import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';

type DocsEntryCardProps = {
  to: string;
  title: string;
  description?: string;
  chips?: string[];
};

export default function DocsEntryCard({ to, title, description, chips }: DocsEntryCardProps) {
  return (
    <Link
      to={to}
      className="lab-card group flex h-full cursor-pointer flex-col p-6 text-right transition duration-200 hover:border-cyan-300/30 hover:bg-white/[0.02]"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-black text-white transition-colors group-hover:text-cyan-100">
          {title}
        </h2>
        <ChevronLeft
          className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-cyan-200"
          aria-hidden
        />
      </div>

      {description ? (
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{description}</p>
      ) : null}

      {chips && chips.length > 0 ? (
        <ul className="mt-4 flex flex-wrap justify-start gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-slate-300"
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
    </Link>
  );
}
