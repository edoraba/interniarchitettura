'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { type ContactFormData, contactSchema } from '@/lib/schemas/contact';

import TransitionLink from './TransitionLink';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [honeypot, setHoneypot] = useState('');

  const onSubmit = async (data: ContactFormData) => {
    if (!privacyAccepted) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website: honeypot }),
      });

      if (!res.ok) throw new Error();

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className='mx-auto max-w-lg text-center'>
        <p className='font-text text-sm leading-relaxed font-light text-gray-300'>
          {t('success')}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto max-w-lg space-y-6'
    >
      {/* Honeypot - hidden from real users */}
      <div className='absolute -z-10 opacity-0' aria-hidden='true'>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          type='text'
          name='website'
          tabIndex={-1}
          autoComplete='off'
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor='name'
          className='block font-text text-[10px] font-light tracking-[0.25em] text-gray-400 uppercase'
        >
          {t('name')}
        </label>
        <input
          id='name'
          type='text'
          placeholder={t('namePlaceholder')}
          {...register('name')}
          className='mt-2 w-full border-b border-gray-600 bg-transparent px-0 py-2 font-text text-sm font-light text-background placeholder:text-gray-600 focus:border-background focus:outline-none'
        />
        {errors.name && (
          <p className='mt-1 font-text text-xs font-light text-red-400'>
            {t('nameError')}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='email'
          className='block font-text text-[10px] font-light tracking-[0.25em] text-gray-400 uppercase'
        >
          {t('email')}
        </label>
        <input
          id='email'
          type='email'
          placeholder={t('emailPlaceholder')}
          {...register('email')}
          className='mt-2 w-full border-b border-gray-600 bg-transparent px-0 py-2 font-text text-sm font-light text-background placeholder:text-gray-600 focus:border-background focus:outline-none'
        />
        {errors.email && (
          <p className='mt-1 font-text text-xs font-light text-red-400'>
            {t('emailError')}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='message'
          className='block font-text text-[10px] font-light tracking-[0.25em] text-gray-400 uppercase'
        >
          {t('message')}
        </label>
        <textarea
          id='message'
          rows={4}
          placeholder={t('messagePlaceholder')}
          {...register('message')}
          className='mt-2 w-full resize-none border-b border-gray-600 bg-transparent px-0 py-2 font-text text-sm font-light text-background placeholder:text-gray-600 focus:border-background focus:outline-none'
        />
        {errors.message && (
          <p className='mt-1 font-text text-xs font-light text-red-400'>
            {t('messageError')}
          </p>
        )}
      </div>

      <label className='flex cursor-pointer items-start gap-3'>
        <input
          type='checkbox'
          checked={privacyAccepted}
          onChange={e => setPrivacyAccepted(e.target.checked)}
          className='mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-600 bg-transparent checked:border-background checked:bg-background'
        />
        <span className='font-text text-xs leading-relaxed font-light text-gray-400'>
          {t('privacyLabel')}{' '}
          <TransitionLink
            href={`/${locale}/privacy-policy`}
            className='text-background underline underline-offset-2 transition-colors hover:text-primary'
          >
            {t('privacyLink')}
          </TransitionLink>
        </span>
      </label>

      {status === 'error' && (
        <p className='font-text text-xs font-light text-red-400'>
          {t('error')}
        </p>
      )}

      <button
        type='submit'
        disabled={status === 'loading' || !privacyAccepted}
        className='w-full border border-gray-600 px-8 py-3 font-text text-xs font-light tracking-[0.2em] text-background uppercase transition-all duration-300 hover:border-background hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50'
      >
        {status === 'loading' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
