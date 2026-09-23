import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateSplitWordsOnScroll(scopeRef, selector = '.gsap-reveal-word') {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const elements = scopeRef.current.querySelectorAll(selector);
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 45, opacity: 0, rotateX: -15, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, scopeRef);

  return ctx;
}

export function animateMaskedHeading(scopeRef, selector = '.gsap-masked-heading') {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const headings = scopeRef.current.querySelectorAll(selector);
    headings.forEach((h) => {
      gsap.fromTo(
        h,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', y: 35, opacity: 0 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: h,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, scopeRef);

  return ctx;
}

export function animateSplitLinesOnScroll(scopeRef, selector = '.gsap-split-line') {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const lines = scopeRef.current.querySelectorAll(selector);
    lines.forEach((line) => {
      gsap.fromTo(
        line,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, scopeRef);

  return ctx;
}
