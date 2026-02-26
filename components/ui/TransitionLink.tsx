'use client';

import { usePathname } from '@/i18n/navigation';

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
  const pathname = usePathname();

  return (
    <a
      href={href}
      onClick={e => {
        e.preventDefault();
        // Don't trigger transition if already on the target page
        if (pathname === href) return;
        navigateWithTransition(href);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
