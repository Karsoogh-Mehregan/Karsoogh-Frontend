/* eslint-disable react-refresh/only-export-components -- MDX element map, not route components */
import { Link } from 'react-router-dom';
import type { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';

function MdxH1({ children, className = '', ...props }: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h2
      className={`mb-6 border-b border-cyan-300/25 pb-4 text-right text-3xl font-black tracking-tight text-cyan-100 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

function MdxH2({ children, className = '', ...props }: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2 className={`mb-4 mt-10 text-right text-xl font-black text-white ${className}`} {...props}>
      {children}
    </h2>
  );
}

function MdxP({ children, className = '', ...props }: ComponentPropsWithoutRef<'p'>) {
  return (
    <p className={`mb-4 text-right text-base leading-8 text-slate-300 ${className}`} {...props}>
      {children}
    </p>
  );
}

function MdxImg({ alt = '', className = '', ...props }: ComponentPropsWithoutRef<'img'>) {
  return (
    <img
      alt={alt}
      className={`mx-auto my-4 block max-w-full rounded-lg ${className}`}
      loading="lazy"
      {...props}
    />
  );
}

function MdxA({ children, className = '', href = '', ...props }: ComponentPropsWithoutRef<'a'>) {
  return (
    <Link
      to={href}
      className={`font-semibold text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 transition-colors duration-200 hover:text-cyan-100 hover:decoration-cyan-200 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

function MdxCode({ children, className = '', ...props }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      className={`rounded-md border border-white/10 bg-slate-950/70 px-1.5 py-0.5 font-mono text-sm text-cyan-100 [direction:ltr] [unicode-bidi:plaintext] ${className}`}
      dir="ltr"
      {...props}
    >
      {children}
    </code>
  );
}

function MdxPre({ children, className = '', ...props }: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre
      className={`mb-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-left text-sm leading-7 text-slate-200 ${className}`}
      dir="ltr"
      {...props}
    >
      {children}
    </pre>
  );
}

function MdxTable({ children, className = '', ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="mb-6 overflow-x-auto rounded-2xl border border-white/10">
      <table
        className={`w-full min-w-[32rem] border-collapse text-right text-sm ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

function MdxThead({ children, className = '', ...props }: ComponentPropsWithoutRef<'thead'>) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
}

function MdxTbody({ children, className = '', ...props }: ComponentPropsWithoutRef<'tbody'>) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

function MdxTr({ children, className = '', ...props }: ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr className={`transition-colors duration-200 hover:bg-white/[0.03] ${className}`} {...props}>
      {children}
    </tr>
  );
}

function MdxTh({ children, className = '', ...props }: ComponentPropsWithoutRef<'th'>) {
  return (
    <th
      className={`border-b border-white/15 bg-white/[0.04] px-4 py-3 text-right font-bold text-cyan-100 ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

function MdxTd({ children, className = '', ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      className={`border-b border-white/10 px-4 py-3 text-right text-slate-300 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}

export const mdxComponents: MDXComponents = {
  h1: MdxH1,
  h2: MdxH2,
  p: MdxP,
  img: MdxImg,
  a: MdxA,
  code: MdxCode,
  pre: MdxPre,
  table: MdxTable,
  thead: MdxThead,
  tbody: MdxTbody,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
};
