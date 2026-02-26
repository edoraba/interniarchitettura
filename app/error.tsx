'use client';

import { Link } from '@/i18n/navigation';

export default function Error() {
  return (
    <html lang='en'>
      <body>
        <main>
          <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
            <h1 className='font-title text-4xl font-light tracking-wider text-foreground'>
              Errore
            </h1>
            <p className='mt-4 font-text text-sm font-light text-gray-500'>
              Qualcosa è andato storto.
            </p>
            <Link
              href='/'
              className='mt-8 font-text text-xs font-light tracking-[0.2em] text-primary uppercase transition-opacity hover:opacity-70'
            >
              Torna alla home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
