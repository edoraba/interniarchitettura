'use client';

import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

export default function LanguageSwitcher({
  className = '',
}: {
  className?: string;
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
        className={`px-1.5 py-0.5 transition-colors duration-300 ${
          locale === 'it'
            ? 'text-foreground'
            : 'text-gray-400 hover:text-foreground'
        }`}
      >
        IT
      </Link>
      <span className='text-gray-300'>/</span>
      <Link
        href={pathname}
        locale='en'
        className={`px-1.5 py-0.5 transition-colors duration-300 ${
          locale === 'en'
            ? 'text-foreground'
            : 'text-gray-400 hover:text-foreground'
        }`}
      >
        EN
      </Link>
    </div>
  );
}
