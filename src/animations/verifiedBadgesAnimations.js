import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initVerifiedBadgesScroll(scopeRef) {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    // 1. Header masked reveal
    gsap.fromTo(
      '.gsap-verified-header',
      { opacity: 0, y: 30, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      {
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-verified-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // 2. 5 Badges Staggered 3D Entrance (y: 80 -> 0, rotate: -3deg -> 0deg)
    gsap.fromTo(
      '.gsap-verified-card',
      { opacity: 0, y: 80, rotate: -3, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.gsap-verified-card-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, scopeRef);

  return ctx;
}
