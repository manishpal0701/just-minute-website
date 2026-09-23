import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHorizontalProductScroll(containerRef, trackRef) {
  if (!containerRef.current || !trackRef.current) return null;

  const ctx = gsap.context(() => {
    const trackWidth = trackRef.current.scrollWidth - trackRef.current.clientWidth;

    gsap.to(trackRef.current, {
      x: -trackWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: () => `+=${trackWidth + 300}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, containerRef);

  return ctx;
}

export function initProductClipPathReveal(scopeRef, selector = '.gsap-clip-reveal') {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const elements = scopeRef.current.querySelectorAll(selector);
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15, opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1.0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.inOut',
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

export function bindGSAP3DTilt(element) {
  if (!element) return () => {};

  const xTo = gsap.quickTo(element, 'rotateY', { duration: 0.4, ease: 'power2.out' });
  const yTo = gsap.quickTo(element, 'rotateX', { duration: 0.4, ease: 'power2.out' });
  const scaleTo = gsap.quickTo(element, 'scale', { duration: 0.3, ease: 'power2.out' });

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 12;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 12;

    xTo(rotateY);
    yTo(rotateX);
    scaleTo(1.04);
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
    scaleTo(1.0);
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}
