import { createElement } from 'react';
import { mdxComponentsByPath } from '@/docs/registry';

type MdxTabPanelProps = {
  modulePath: string;
};

export default function MdxTabPanel({ modulePath }: MdxTabPanelProps) {
  const Content = mdxComponentsByPath[modulePath];

  if (!Content) {
    return <p className="text-right text-slate-400">محتوای این تب موجود نیست.</p>;
  }

  return createElement(Content);
}
