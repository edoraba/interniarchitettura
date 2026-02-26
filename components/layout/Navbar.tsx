'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { usePageTransition } from '@/components/ui/PageTransition';
import TransitionLink from '@/components/ui/TransitionLink';
import useScrollToSection from '@/hooks/useScrollToSection';
import { usePathname } from '@/i18n/navigation';
import { gsap, useGSAP } from '@/lib/gsap';

export default function Navbar() {
  const t = useTranslations('nav');
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { navigateWithTransition } = usePageTransition();
  const scrollToSection = useScrollToSection();
  const pendingSectionRef = useRef<string | null>(null);

  useGSAP(
    () => {
      if (!navRef.current) return;

      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    },
    { scope: navRef }
  );

  // Handle deferred scroll after navigating back to homepage
  useEffect(() => {
    if (pathname === '/' && pendingSectionRef.current) {
      const timeout = setTimeout(() => {
        scrollToSection(pendingSectionRef.current!, {
          duration: 1.2,
          offset: -20,
        });
        pendingSectionRef.current = null;
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [pathname, scrollToSection]);

  const navLinks = [
    { section: '#chi-siamo', label: t('about') },
    { section: '#progetti', label: t('projects') },
    { section: '#contatti', label: t('contact') },
  ];

  const handleNavClick = (section: string) => {
    setMenuOpen(false);
    if (pathname === '/') {
      scrollToSection(section, { duration: 1.2, offset: -20 });
    } else {
      pendingSectionRef.current = section;
      navigateWithTransition('/');
    }
  };

  return (
    <nav
      ref={navRef}
      className='fixed top-0 right-0 left-0 z-50 mix-blend-difference'
    >
      <div className='container flex items-center justify-between py-6'>
        {/* Logo */}
        <TransitionLink
          href='/'
          className='font-title text-lg font-light tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-70'
        >
          S&F
        </TransitionLink>

        {/* Desktop Nav */}
        <div className='hidden items-center gap-8 md:flex'>
          {navLinks.map(link => (
            <button
              key={link.section}
              onClick={() => handleNavClick(link.section)}
              className='font-text text-xs font-light tracking-[0.15em] text-white uppercase transition-opacity hover:opacity-70'
            >
              {link.label}
            </button>
          ))}
          <LanguageSwitcher className='text-white [&_a]:text-white/50 [&_a]:hover:text-white [&_span]:text-white/30' />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='flex flex-col gap-1.5 md:hidden'
          aria-label='Toggle menu'
        >
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 ${menuOpen ? 'translate-y-1.75rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 ${menuOpen ? '-translate-y-1.75 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='fixed inset-0 top-0 flex flex-col items-center justify-center gap-8 bg-foreground/95 backdrop-blur-sm md:hidden'>
          <button
            onClick={() => setMenuOpen(false)}
            className='absolute top-6 right-6 text-white'
            aria-label='Close menu'
          >
            <span className='block h-px w-6 translate-y-[0.5px] rotate-45 bg-white' />
            <span className='block h-px w-6 -translate-y-[0.5px] -rotate-45 bg-white' />
          </button>
          {navLinks.map(link => (
            <button
              key={link.section}
              onClick={() => handleNavClick(link.section)}
              className='font-title text-3xl font-light tracking-wider text-white'
            >
              {link.label}
            </button>
          ))}
          <LanguageSwitcher className='mt-4 text-white [&_a]:text-white/50 [&_a]:hover:text-white [&_span]:text-white/30' />
        </div>
      )}
    </nav>
  );
}
