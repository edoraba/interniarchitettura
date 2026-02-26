'use client';

import { usePageTransition } from './PageTransition';

export default function TransitionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { navigateWithTransition } = usePageTransition();

  return (
    <a
      href={href}
      onClick={e => {
        e.preventDefault();
        navigateWithTransition(href);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
