import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateFlavourProductMorph(scopeRef, onCompleteCallback) {
  if (!scopeRef.current) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onCompleteCallback) onCompleteCallback();
      },
    });

    // 1. Current product moves upward, scales down slightly, and fades out (NO 3D ROTATION)
    tl.to('.gsap-flavour-product', {
      scale: 0.94,
      opacity: 0,
      y: -35,
      duration: 0.3,
      ease: 'power2.in',
    })
    // 2. Old typography shifts & fades out
    .to('.gsap-flavour-text', {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.in',
    }, 0)
    // 3. New product enters from below with scale & fade in (NO 3D ROTATION)
    .fromTo(
      '.gsap-flavour-product',
      { scale: 0.94, opacity: 0, y: 35 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    )
    // 4. New typography reveals
    .fromTo(
      '.gsap-flavour-text',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
      '-=0.3'
    )
    // 5. Ambient fruit badges pop into position
    .fromTo(
      '.gsap-flavour-badge',
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'back.out(1.5)' },
      '-=0.25'
    );
  }, scopeRef);

  return ctx;
}

export function updateFlavourThemeCSSVars(flavour) {
  if (!flavour || !flavour.colors) return;

  gsap.to(':root', {
    '--flavour-primary': flavour.colors.primary,
    '--flavour-secondary': flavour.colors.secondary,
    '--flavour-dark': flavour.colors.dark,
    '--flavour-glow': flavour.colors.glow || flavour.colors.primary,
    duration: 0.8,
    ease: 'power2.out',
  });
}

export function initPinnedFlavourScroll(containerRef, flavours, onFlavourIndexChange) {
  if (!containerRef.current) return null;

  const ctx = gsap.context(() => {
    const totalFlavours = flavours.length;
    
    // Create a pinned ScrollTrigger covering 7 progress stops
    const pinnedTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: `+=${totalFlavours * 100}%`,
        scrub: 1,
        snap: {
          snapTo: 1 / (totalFlavours - 1),
          duration: { min: 0.25, max: 0.5 },
          delay: 0.08,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const index = Math.min(
            totalFlavours - 1,
            Math.floor(self.progress * totalFlavours * 0.999)
          );
          if (onFlavourIndexChange) {
            onFlavourIndexChange(index, self.progress);
          }
        },
      },
    });

    // Animate product 3D rotation & ambient glow scrub
    pinnedTl.to('.pinned-product-box', {
      rotateY: 180,
      scale: 0.88,
      ease: 'none',
      duration: totalFlavours * 0.9,
    }, 0);

    pinnedTl.to('.pinned-ambient-glow', {
      scale: 1.4,
      rotate: 120,
      ease: 'none',
      duration: totalFlavours * 0.9,
    }, 0);
  }, containerRef);

  return ctx;
}
