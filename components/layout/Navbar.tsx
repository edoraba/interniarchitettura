'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useLenis } from 'lenis/react';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { usePageTransition } from '@/components/ui/PageTransition';
import TransitionLink from '@/components/ui/TransitionLink';
import useScrollToSection from '@/hooks/useScrollToSection';
import { usePathname } from '@/i18n/navigation';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const t = useTranslations('nav');
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const menuLangRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHidden = useRef(false);
  const lenisRef = useRef<ReturnType<typeof useLenis> | null>(null);
  const pathname = usePathname();
  const { navigateWithTransition } = usePageTransition();
  const scrollToSection = useScrollToSection();
  const pendingSectionRef = useRef<string | null>(null);

  // Mobile menu timeline setup
  useGSAP(
    () => {
      if (!menuRef.current) return;

      gsap.set(menuRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        pointerEvents: 'none',
      });

      const items = menuItemsRef.current.filter(Boolean);

      menuTlRef.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.5,
          ease: 'power3.inOut',
          onStart: () => {
            if (menuRef.current) menuRef.current.style.pointerEvents = 'auto';
          },
        })
        .from(
          items,
          {
            y: 30,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .from(
          menuLangRef.current!,
          {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'power3.out',
          },
          '-=0.1'
        );
    },
    { scope: menuRef }
  );

  // Scroll-based hide/show
  useLenis(lenis => {
    lenisRef.current = lenis;
    if (!navRef.current || menuOpen) return;

    const currentY = lenis.scroll;
    const direction = lenis.direction; // 1 = down, -1 = up

    if (direction === 1 && currentY > 100 && !isHidden.current) {
      isHidden.current = true;
      gsap.to(navRef.current, {
        y: '-100%',
        duration: 0.4,
        ease: 'power3.inOut',
      });
    } else if (direction === -1 && isHidden.current) {
      isHidden.current = false;
      gsap.to(navRef.current, {
        y: '0%',
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  });

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

  const toggleMenu = useCallback(() => {
    if (!menuTlRef.current) return;

    if (menuOpen) {
      menuTlRef.current.reverse();
      gsap.delayedCall(0.5, () => {
        setMenuOpen(false);
        lenisRef.current?.start();
      });
    } else {
      lenisRef.current?.stop();
      setMenuOpen(true);
      menuTlRef.current.play(0);
    }
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (section: string) => {
      const doNavigation = () => {
        if (pathname === '/') {
          scrollToSection(section, { duration: 1.2, offset: -20 });
        } else {
          pendingSectionRef.current = section;
          navigateWithTransition('/');
        }
      };

      if (menuTlRef.current && menuOpen) {
        menuTlRef.current.reverse();
        gsap.delayedCall(0.5, () => {
          setMenuOpen(false);
          doNavigation();
        });
      } else {
        doNavigation();
      }
    },
    [menuOpen, pathname, scrollToSection, navigateWithTransition]
  );

  return (
    <>
      <nav
        ref={navRef}
        className='animate-navbar-enter fixed top-0 right-0 left-0 z-50'
      >
        <div className='container flex items-center justify-between py-6'>
          {/* Logo */}
          <TransitionLink
            href='/'
            className='font-title text-lg font-light tracking-[0.2em] text-foreground uppercase transition-opacity hover:opacity-70'
          >
            S&F
          </TransitionLink>

          {/* Desktop Nav */}
          <div className='hidden items-center gap-8 md:flex'>
            {navLinks.map(link => (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className='font-text text-xs font-light tracking-[0.15em] text-foreground uppercase transition-opacity hover:opacity-70'
              >
                {link.label}
              </button>
            ))}
            <LanguageSwitcher
              activeClassName='text-foreground'
              inactiveClassName='text-foreground/50 hover:text-foreground'
              separatorClassName='text-foreground/30'
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='flex flex-col gap-1.5 md:hidden'
            aria-label='Toggle menu'
          >
            <span
              className={cn(
                'bg-foregtext-foreground block h-px w-6 transition-transform duration-300',
                menuOpen && 'translate-y-[7px] rotate-45'
              )}
            />
            <span
              className={cn(
                'bg-foregtext-foreground block h-px w-6 transition-opacity duration-300',
                menuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'bg-foregtext-foreground block h-px w-6 transition-transform duration-300',
                menuOpen && '-translate-y-[7px] -rotate-45'
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu — outside nav to avoid transform containment breaking fixed positioning */}
      <div
        ref={menuRef}
        className='fixed inset-0 z-50 flex flex-col bg-foreground/95 backdrop-blur-sm md:hidden'
        style={{ clipPath: 'inset(0 0 100% 0)', pointerEvents: 'none' }}
      >
        {/* Top bar — mirrors navbar layout */}
        <div className='container flex items-center justify-between py-6'>
          <span className='font-title text-lg font-light tracking-[0.2em] text-white uppercase'>
            S&F
          </span>
          <button
            onClick={toggleMenu}
            className='flex flex-col gap-1.5'
            aria-label='Close menu'
          >
            <span className='block h-px w-6 translate-y-[3.5px] rotate-45 bg-white' />
            <span className='block h-px w-6 -translate-y-[3.5px] -rotate-45 bg-white' />
          </button>
        </div>

        {/* Menu content */}
        <div className='flex flex-1 flex-col items-center justify-center gap-8'>
          {navLinks.map((link, i) => (
            <button
              key={link.section}
              ref={el => {
                menuItemsRef.current[i] = el;
              }}
              onClick={() => handleNavClick(link.section)}
              className='font-title text-3xl font-light tracking-wider text-white'
            >
              {link.label}
            </button>
          ))}
          <div ref={menuLangRef}>
            <LanguageSwitcher
              className='mt-4'
              activeClassName='text-white'
              inactiveClassName='text-white/50 hover:text-white'
              separatorClassName='text-white/30'
            />
          </div>
        </div>
      </div>
    </>
  );
}
