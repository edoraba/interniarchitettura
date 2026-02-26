'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <div>
      <div className='flex center flex-col gap-4 min-h-screen text-balance text-center'>
        <h2 className='font-title font-bold text-4xl lg:text-6xl'>
          Something went wrong
        </h2>
        <Link
          href='/'
          className='bg-primary hover:bg-primary/80 transition-colors px-4 py-3 rounded-lg w-fit'
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
}
