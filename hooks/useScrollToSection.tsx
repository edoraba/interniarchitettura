import { useCallback } from 'react';

import { useLenis } from 'lenis/react';

/* 
  HOW TO USE
  import useScrollToSection from '@/hooks/useScrollToSection';
  const scrollToSection = useScrollToSection();
  onClick={() => scrollToSection('#hero', { duration: 1 })}
*/

interface ScrollOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

export const useScrollToSection = () => {
  const lenis = useLenis();

  const scrollToSection = useCallback(
    (selector: string, options?: ScrollOptions) => {
      if (!lenis) return;

      const {
        offset = 0,
        duration = 1,
        immediate = false,
        lock = false,
        onComplete,
      } = options || {};

      lenis.scrollTo(selector, {
        offset,
        duration,
        immediate,
        lock,
        onComplete,
      });
    },
    [lenis]
  );

  return scrollToSection;
};

export default useScrollToSection;
