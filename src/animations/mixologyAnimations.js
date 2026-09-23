import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMixologyHeroTimeline(scopeRef) {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    });

    // 1. Badge entrance
    tl.fromTo(
      '.gsap-mixology-badge',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    )
    // 2. Sequential line-by-line heading reveal
    .fromTo(
      '.gsap-mixology-heading-line',
      { y: 40, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.75, stagger: 0.12 },
      '-=0.3'
    )
    // 3. Description reveal
    .fromTo(
      '.gsap-mixology-desc',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    // 4. Recipe card entrance from y: 80 -> 0, scale: 0.94 -> 1
    .fromTo(
      '.gsap-mixology-card',
      { opacity: 0, y: 80, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.3'
    )
    // 5. Right promo visual image panel clip-path expansion & 3D rotation
    .fromTo(
      '.gsap-mixology-promo',
      { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', scale: 1.12, rotateY: 15 },
      { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', scale: 1, rotateY: 0, duration: 1.0, ease: 'power3.inOut' },
      '-=0.7'
    );
  }, scopeRef);

  return ctx;
}

export function initMixologyPinnedRecipeScroll(containerRef, onIngredientActive) {
  if (!containerRef.current) return null;

  const ctx = gsap.context(() => {
    // 1. Image Scrub Parallax on right visual
    gsap.to('.gsap-mixology-promo-img', {
      y: -60,
      rotate: 4,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    // 2. Ingredients Stagger Entrance & Highlight Glow
    gsap.fromTo(
      '.gsap-ingredient-item',
      { opacity: 0, x: -30, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.gsap-mixology-card',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, containerRef);

  return ctx;
}
