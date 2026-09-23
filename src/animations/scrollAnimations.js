import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function init4LayerParallaxDepth(scopeRef) {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    // Layer 1: Background mesh & gradient aura (Very slow 0.1x speed)
    gsap.utils.toArray('.parallax-layer-1').forEach((el) => {
      gsap.to(el, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });

    // Layer 2: Decorative shapes & citrus slices (0.3x speed)
    gsap.utils.toArray('.parallax-layer-2').forEach((el) => {
      gsap.to(el, {
        y: -80,
        rotate: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
    });

    // Layer 3: Product packaging & primary visual (0.6x speed)
    gsap.utils.toArray('.parallax-layer-3').forEach((el) => {
      gsap.to(el, {
        y: -140,
        rotate: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      });
    });

    // Layer 4: Typography & UI Badges (0.4x speed)
    gsap.utils.toArray('.parallax-layer-4').forEach((el) => {
      gsap.to(el, {
        y: -100,
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    });
  }, scopeRef);

  return ctx;
}

export function initScrollVelocityReactivity(scopeRef) {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const floaters = scopeRef.current.querySelectorAll('.gsap-velocity-react');
    if (!floaters.length) return;

    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.min(Math.max(self.getVelocity() / 300, -8), 8);
        gsap.to(floaters, {
          skewY: velocity * 0.4,
          scaleY: 1 + Math.abs(velocity) * 0.01,
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      },
    });
  }, scopeRef);

  return ctx;
}

export function initMixologyPinnedScroll(containerRef, onStepChange) {
  if (!containerRef.current) return null;

  const ctx = gsap.context(() => {
    const stepsTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: '+=250%',
        scrub: 0.6,
        onUpdate: (self) => {
          const stepIndex = Math.min(3, Math.floor(self.progress * 4 * 0.999));
          if (onStepChange) onStepChange(stepIndex);
        },
      },
    });

    // 0% -> 25%: POUR animation (pack tilts & moves toward glass)
    stepsTl.to('.gsap-prep-pour-img', {
      rotate: -40,
      x: -30,
      y: 20,
      duration: 1,
    })
    // 25% -> 50%: ADD (liquid fill effect)
    .to('.gsap-prep-liquid-fill', {
      height: '75%',
      opacity: 0.95,
      duration: 1,
    })
    // 50% -> 75%: STIR (swirl ring & glass rotation)
    .to('.gsap-prep-stir-ring', {
      rotate: 720,
      scale: 1.2,
      duration: 1,
    })
    // 75% -> 100%: CHILL (ice cubes drop & sparkles burst)
    .to('.gsap-prep-ice-cubes', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 0.12,
    });
  }, containerRef);

  return ctx;
}
