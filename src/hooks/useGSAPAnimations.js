import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useResponsiveGSAP(animationFn, dependencies = [], scopeRef = null) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mm = gsap.matchMedia();

    if (prefersReduced) {
      // Simplified static state for reduced motion users
      return () => mm.revert();
    }

    mm.add({
      isDesktop: '(min-width: 1024px)',
      isMobile: '(max-width: 1023px)',
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions;
      if (typeof animationFn === 'function') {
        animationFn({ isDesktop, isMobile, mm });
      }
    });

    return () => mm.revert();
  }, { dependencies, scope: scopeRef });
}
