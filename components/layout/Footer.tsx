'use client';

import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className='border-t border-gray-200 bg-background'>
      <div className='container flex flex-col items-center justify-between gap-4 py-8 md:flex-row'>
        <p className='font-text text-xs font-light tracking-wider text-gray-500'>
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
        <div className='flex items-center gap-6'>
          <p className='font-text text-xs font-light tracking-wider text-gray-500'>
            {t('poweredBy')}{' '}
            <a
              href='https://redergo.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary transition-opacity hover:opacity-70'
            >
              Redergo
            </a>
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
