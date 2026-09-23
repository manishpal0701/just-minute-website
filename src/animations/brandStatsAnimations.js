import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initBrandStatsScroll(scopeRef) {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    // 1. Banner clip-path reveal & scale down
    gsap.fromTo(
      '.gsap-stats-banner',
      { opacity: 0, clipPath: 'inset(50% 0% 50% 0%)', scale: 1.08 },
      {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1.0,
        duration: 0.9,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.gsap-stats-banner',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // 2. 4 Stats cards staggered entrance
    gsap.fromTo(
      '.gsap-stats-card',
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.gsap-stats-card-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, scopeRef);

  return ctx;
}
