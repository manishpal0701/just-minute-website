import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ activeFlavour, onLoaded }) {
  const overlayRef = useRef(null);
  const timelineRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  // Asset preloading list
  const ASSETS_TO_PRELOAD = [
    '/assets/products/box-1l-mango.png',
    '/assets/products/party-mango.png',
    '/assets/products/sachet-powder.png',
    activeFlavour?.assets?.box1l || '/assets/products/box-1l-mango.png'
  ];

  useEffect(() => {
    // 1. Lock Body Scroll
    document.body.style.overflow = 'hidden';

    // 2. Preload Assets with Failsafe Timeout
    const preloadPromise = new Promise((resolve) => {
      let loadedCount = 0;
      const totalAssets = ASSETS_TO_PRELOAD.length;

      // Safety timeout: proceed after 2.2 seconds no matter what
      const safetyTimeout = setTimeout(() => {
        resolve();
      }, 2200);

      ASSETS_TO_PRELOAD.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount >= totalAssets) {
            clearTimeout(safetyTimeout);
            resolve();
          }
        };
      });
    });

    const ctx = gsap.context(() => {
      // 3. Build GSAP Entrance & Sequence Timeline
      const minDurationPromise = new Promise((resolve) => setTimeout(resolve, 1600));

      const tl = gsap.timeline({
        onComplete: () => {
          // Wait for BOTH preloader promise and minimum duration (1.6s) before exit animation
          Promise.all([preloadPromise, minDurationPromise]).then(() => {
            triggerExitAnimation();
          });
        }
      });

      timelineRef.current = tl;

      // Initial state
      gsap.set('.loader-logo', { opacity: 0, scale: 0.8 });
      gsap.set('.loader-bubble', { opacity: 0, scale: 0, transformOrigin: 'center center' });
      gsap.set('.loader-product', { opacity: 0, scale: 0.85, y: 30 });
      gsap.set('.loader-indicator', { opacity: 0, y: 15 });
      gsap.set('.loader-progress-bar', { width: '0%' });

      // PHASE 1 & 2 — LOGO REVEAL (0.5s)
      tl.to('.loader-logo', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      });

      // PHASE 3 — JUICE / FLAVOUR EFFECT (BUBBLES & DOTS) (0.4s)
      tl.to('.loader-bubble', {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      }, '-=0.2');

      // Floating idle motion for bubbles
      gsap.to('.loader-bubble', {
        y: 'random(-10, 10)',
        x: 'random(-8, 8)',
        rotate: 'random(-15, 15)',
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.05
      });

      // PHASE 5 — PRODUCT REVEAL (0.5s)
      tl.to('.loader-product', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.4)'
      }, '-=0.2');

      // PHASE 4 — LOADING INDICATOR & PROGRESS BAR (0.8s)
      tl.to('.loader-indicator', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.1');

      tl.to('.loader-progress-bar', {
        width: '100%',
        duration: 0.8,
        ease: 'power1.inOut'
      });
    }, overlayRef);

    // PHASE 6 — EXIT ANIMATION
    const triggerExitAnimation = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'auto';
          setIsFinished(true);
          if (onLoaded) onLoaded();

          // Refresh ScrollTrigger so all homepage triggers align accurately
          setTimeout(() => {
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          }, 100);
        }
      });

      exitTl.to(['.loader-logo-inner', '.loader-product-img'], {
        scale: 1.06,
        duration: 0.25,
        ease: 'power2.out'
      });

      exitTl.to('.loader-content', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in'
      }, '+=0.05');

      exitTl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.65,
        ease: 'power4.inOut'
      }, '-=0.15');
    };

    return () => {
      document.body.style.overflow = 'auto';
      ctx.revert();
    };
  }, []);

  if (isFinished) return null;

  // 12 Solid Flavour Floating Elements (Bubbles/Dots/Sparkles)
  const decorativeBubbles = [
    { size: 'w-6 h-6', bg: '#FF9800', top: '18%', left: '15%' },
    { size: 'w-4 h-4', bg: '#84CC16', top: '25%', right: '18%' },
    { size: 'w-8 h-8', bg: '#E91E63', top: '35%', left: '12%' },
    { size: 'w-5 h-5', bg: '#FFC107', top: '42%', right: '14%' },
    { size: 'w-7 h-7', bg: '#8E24AA', top: '60%', left: '16%' },
    { size: 'w-4 h-4', bg: '#FF9800', top: '68%', right: '20%' },
    { size: 'w-5 h-5', bg: '#E11D48', top: '75%', left: '22%' },
    { size: 'w-6 h-6', bg: '#84CC16', top: '80%', right: '15%' },
    { size: 'w-3 h-3', bg: '#3E1A00', top: '15%', right: '30%' },
    { size: 'w-4 h-4', bg: '#FF9800', top: '20%', left: '32%' },
    { size: 'w-3 h-3', bg: '#E91E63', top: '82%', left: '40%' },
    { size: 'w-4 h-4', bg: '#FFC107', top: '85%', right: '35%' },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
      style={{
        backgroundColor: '#FFF6DB',
        color: '#3E1A00'
      }}
      aria-label="Just Minute Loading Screen"
    >
      {/* Decorative Solid Flavour Bubbles (NO GRADIENTS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {decorativeBubbles.map((bubble, idx) => (
          <div
            key={idx}
            className={`loader-bubble absolute rounded-full border-2 border-[#3E1A00] shadow-sm ${bubble.size}`}
            style={{
              backgroundColor: bubble.bg,
              top: bubble.top,
              left: bubble.left,
              right: bubble.right
            }}
          />
        ))}
      </div>

      {/* Center Container */}
      <div className="loader-content relative z-10 flex flex-col items-center max-w-sm sm:max-w-md w-full text-center space-y-4 sm:space-y-6">
        
        {/* PHASE 1 & 2: LOGO REVEAL */}
        <div className="loader-logo flex flex-col items-center">
          <div className="loader-logo-inner flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-4 border-[#3E1A00] shadow-[4px_4px_0px_#3E1A00]">
            <div className="w-10 h-10 rounded-xl bg-[#FF9800] border-2 border-[#3E1A00] flex items-center justify-center font-sheetal font-black text-white text-xl shadow-inner">
              JM
            </div>
            <div className="text-left">
              <span className="font-sheetal font-black text-2xl sm:text-3xl tracking-tight text-[#3E1A00] block leading-none">
                JUST MINUTE
              </span>
              <span className="font-bubble font-bold text-xs sm:text-sm text-[#FF9800] tracking-wider block mt-0.5">
                Instant Flavour Magic
              </span>
            </div>
          </div>
        </div>

        {/* PHASE 5: PRODUCT REVEAL */}
        <div className="loader-product relative flex items-center justify-center py-2">
          {/* Solid Backdrop Badge Accent */}
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#FDE68A] border-3 border-[#3E1A00] -z-10" />
          <img
            src={activeFlavour?.assets?.box1l || '/assets/products/box-1l-mango.png'}
            alt="Just Minute Packaging"
            className="loader-product-img max-h-36 sm:max-h-48 object-contain drop-shadow-md"
          />
        </div>

        {/* PHASE 4: LOADING INDICATOR */}
        <div className="loader-indicator w-full flex flex-col items-center space-y-3 pt-2">
          <div className="flex items-center gap-2 font-sheetal font-black text-xs sm:text-sm uppercase tracking-widest text-[#3E1A00]">
            <span>PREPARING YOUR FLAVOUR</span>
            <span className="inline-flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
            </span>
          </div>

          {/* Solid Progress Bar (NO GRADIENTS) */}
          <div className="w-48 sm:w-64 h-3 rounded-full bg-white border-2 border-[#3E1A00] overflow-hidden p-0.5 shadow-inner">
            <div className="loader-progress-bar h-full rounded-full bg-[#FF9800]" />
          </div>
        </div>

      </div>
    </div>
  );
}
