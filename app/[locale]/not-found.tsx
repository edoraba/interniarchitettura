import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <h1 className='font-title text-[15vw] leading-none font-light text-gray-200 md:text-[10vw]'>
        404
      </h1>
      <p className='mt-4 font-text text-sm font-light tracking-[0.2em] text-gray-500 uppercase'>
        Pagina non trovata
      </p>
      <Link
        href='/'
        className='mt-8 font-text text-xs font-light tracking-[0.2em] text-primary uppercase transition-opacity hover:opacity-70'
      >
        Torna alla home
      </Link>
    </div>
  );
}
