import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initFooterCTAEntrance(scopeRef) {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    // 1. Footer columns staggered entrance
    gsap.fromTo(
      '.gsap-footer-col',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, scopeRef);

  return ctx;
}
