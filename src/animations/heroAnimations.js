import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroEntrance(scopeRef) {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Navbar slide-down
    tl.fromTo(
      '.gsap-nav',
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    // 2. Background atmosphere gradually appears
    .fromTo(
      '.gsap-hero-bg',
      { opacity: 0, scale: 1.08 },
      { opacity: 1, scale: 1, duration: 1.0 },
      '-=0.5'
    )
    // 3. Main headline words stagger reveal
    .fromTo(
      '.gsap-hero-word',
      { y: 50, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.07 },
      '-=0.6'
    )
    // 4. Supporting text slides upward with opacity
    .fromTo(
      '.gsap-hero-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    )
    // 5. CTA buttons stagger entry
    .fromTo(
      '.gsap-hero-cta',
      { y: 25, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    )
    // 6. Product packaging enters from side/bottom with opacity, scale, rotation, 3D
    .fromTo(
      '.gsap-hero-pack',
      { y: 100, x: 40, opacity: 0, scale: 0.7, rotate: -15 },
      { y: 0, x: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.4)' },
      '-=0.6'
    )
    // 7. Ambient fruit/particle floaters animate into position
    .fromTo(
      '.gsap-hero-badge',
      { scale: 0, opacity: 0, rotate: -30 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.7)' },
      '-=0.7'
    )
    // 8. Flavour selector pills appear last
    .fromTo(
      '.gsap-hero-pills',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    );
  }, scopeRef);

  return ctx;
}

export function initHeroScrollTrigger(scopeRef) {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const heroScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    // 1. Scale down, move horizontally & rotate product into depth on scroll
    heroScrollTl.to('.gsap-hero-pack', {
      scale: 0.72,
      x: -80,
      y: 60,
      rotate: -10,
      filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.6))',
      ease: 'none',
    }, 0);

    // 2. Hero typography moves upward with fading opacity & subtle scale down
    heroScrollTl.to('.gsap-hero-title-box', {
      y: -120,
      opacity: 0.15,
      scale: 0.92,
      ease: 'none',
    }, 0);

    // 3. Parallax ambient badges move at varied speeds & rotate
    heroScrollTl.to('.gsap-hero-badge-1', { y: -140, rotate: 45, ease: 'none' }, 0);
    heroScrollTl.to('.gsap-hero-badge-2', { y: -180, rotate: -40, ease: 'none' }, 0);
    heroScrollTl.to('.gsap-hero-badge-3', { y: -100, rotate: 25, ease: 'none' }, 0);

    // 4. Flavour selector pills bar smoothly shifts down toward next section
    heroScrollTl.to('.gsap-hero-pills', {
      y: -40,
      opacity: 0.4,
      scale: 0.95,
      ease: 'none',
    }, 0);
  }, scopeRef);

  return ctx;
}
