'use client';

import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

export default function LanguageSwitcher({
  className = '',
  activeClassName = 'text-foreground',
  inactiveClassName = 'text-gray-400 hover:text-foreground',
  separatorClassName = 'text-gray-300',
}: {
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  separatorClassName?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center gap-1 font-text text-sm tracking-wider uppercase ${className}`}
    >
      <Link
        href={pathname}
        locale='it'
        className={`px-2 py-2 transition-colors duration-300 ${
          locale === 'it' ? activeClassName : inactiveClassName
        }`}
      >
        IT
      </Link>
      <span className={separatorClassName}>/</span>
      <Link
        href={pathname}
        locale='en'
        className={`px-2 py-2 transition-colors duration-300 ${
          locale === 'en' ? activeClassName : inactiveClassName
        }`}
      >
        EN
      </Link>
    </div>
  );
}
