'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <div>
      <div className='center flex min-h-screen flex-col gap-4 text-center text-balance'>
        <h2 className='font-title text-4xl font-bold lg:text-6xl'>
          Something went wrong
        </h2>
        <Link
          href='/'
          className='w-fit rounded-lg bg-primary px-4 py-3 transition-colors hover:bg-primary/80'
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
}
