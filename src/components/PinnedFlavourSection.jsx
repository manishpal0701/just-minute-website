import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Droplets } from 'lucide-react';
import { updateFlavourThemeCSSVars, animateFlavourProductMorph } from '../animations/flavourAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function PinnedFlavourSection({ flavours, activeFlavour, onSelectFlavour, onOpenRetailerModal }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = flavours[currentIndex] || flavours[0];

  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const scrollTriggerInstanceRef = useRef(null);

  useEffect(() => {
    updateFlavourThemeCSSVars(current);
  }, [currentIndex, current]);

  useEffect(() => {
    if (activeFlavour) {
      const idx = flavours.findIndex((f) => f.id === activeFlavour.id);
      if (idx !== -1 && idx !== currentIndexRef.current) {
        setCurrentIndex(idx);
      }
    }
  }, [activeFlavour, flavours]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const total = flavours.length;

    // Set initial GSAP states: Flavour 0 (Mango) is centered/visible, all others hidden below
    flavours.forEach((_, idx) => {
      if (idx === 0) {
        gsap.set(`.pinned-prod-${idx}`, { y: 0, scale: 1, opacity: 1 });
      } else {
        gsap.set(`.pinned-prod-${idx}`, { y: 40, scale: 0.94, opacity: 0 });
      }
    });

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: `+=${total * 95}%`,
        scrub: 0.8,
        snap: {
          snapTo: 1 / (total - 1),
          duration: { min: 0.2, max: 0.45 },
          delay: 0.05,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          scrollTriggerInstanceRef.current = self;
          const idx = Math.min(total - 1, Math.floor(self.progress * total * 0.999));
          if (idx !== currentIndexRef.current) {
            setCurrentIndex(idx);
          }
        },
      },
    });

    // Scroll-driven product transition across 7 flavours (NO 3D ROTATION)
    // Outgoing product: moves up (y: -40), scales down (scale: 0.94), fades out (opacity: 0)
    // Incoming product: enters from below (y: 0), scales up (scale: 1), fades in (opacity: 1)
    for (let i = 0; i < total - 1; i++) {
      const startTime = i;

      pinTl.to(`.pinned-prod-${i}`, {
        y: -40,
        scale: 0.94,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.7,
      }, startTime + 0.15);

      pinTl.to(`.pinned-prod-${i + 1}`, {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.inOut',
        duration: 0.7,
      }, startTime + 0.15);
    }

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, { scope: containerRef, dependencies: [flavours] });

  const handleManualSelect = (idx, flavour) => {
    setCurrentIndex(idx);
    onSelectFlavour(flavour);
    if (scrollTriggerInstanceRef.current) {
      const st = scrollTriggerInstanceRef.current;
      const targetY = st.start + (idx / (flavours.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden transition-colors duration-500 py-10 px-4 md:px-12"
      style={{
        backgroundColor: current.colors.background,
        color: current.colors.dark
      }}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-30" 
          style={{ backgroundColor: current.colors.primary }}
        />
        <div 
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-30" 
          style={{ backgroundColor: current.colors.secondary }}
        />
      </div>

      {/* Top Header */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 text-xs font-black uppercase tracking-wider shadow-sm"
            style={{ color: current.colors.dark, borderColor: current.colors.dark }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: current.colors.primary }} />
            <span>Pinned Scroll Flavour Journey</span>
          </div>
          <h2 
            className="text-2xl md:text-4xl font-black font-sheetal tracking-tight mt-2"
            style={{ color: current.colors.dark }}
          >
            7 Signature Taste Experiences
          </h2>
        </div>

        {/* Flavour Step Indicator Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {flavours.map((f, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={f.id}
                onClick={() => handleManualSelect(i, f)}
                className={`group relative px-3.5 py-2 rounded-full text-xs font-sheetal font-black transition-all duration-300 whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
                  isActive
                    ? 'scale-105 text-white z-10 shadow-md'
                    : 'bg-white hover:scale-104 border-2'
                }`}
                style={{
                  backgroundColor: isActive ? f.colors.primary : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : f.colors.dark,
                  borderColor: f.colors.dark,
                  boxShadow: isActive ? `3px 3px 0px ${f.colors.dark}` : undefined
                }}
              >
                <span 
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
                  style={{ 
                    backgroundColor: isActive ? '#FFFFFF' : f.colors.primary,
                    color: f.colors.dark
                  }}
                >
                  {isActive && <span className="text-[9px] font-black">✓</span>}
                </span>
                <span>{f.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Showcase Grid */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
        
        {/* Left Column: Flavour Details */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
          
          <div 
            className="gsap-flavour-text inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-white border text-xs font-sheetal font-black w-fit"
            style={{ color: current.colors.dark, borderColor: `${current.colors.dark}30` }}
          >
            <span>FLAVOUR 0{currentIndex + 1} OF 07</span>
            <span>•</span>
            <span className="uppercase font-bold">{current.tagline}</span>
          </div>

          <h1 
            className="gsap-flavour-text text-4xl sm:text-6xl lg:text-7xl font-black font-sheetal tracking-tight leading-none drop-shadow-sm"
            style={{ color: current.colors.dark }}
          >
            {current.name}
          </h1>

          <p 
            className="gsap-flavour-text text-base sm:text-lg font-semibold leading-relaxed max-w-xl opacity-90"
            style={{ color: current.colors.dark }}
          >
            {current.description}
          </p>

          {/* Quick Flavor Attribute Badges */}
          <div className="grid grid-cols-3 gap-3 max-w-md pt-2">
            <div 
              className="p-3 rounded-2xl bg-white border-2 shadow-sm flex flex-col items-center text-center"
              style={{ borderColor: current.colors.dark }}
            >
              <Droplets className="w-5 h-5 mb-1" style={{ color: current.colors.primary }} />
              <span className="text-[10px] uppercase font-black opacity-75" style={{ color: current.colors.dark }}>Mix Ratio</span>
              <span className="text-xs font-black" style={{ color: current.colors.dark }}>1 : 5 Water</span>
            </div>
            <div 
              className="p-3 rounded-2xl bg-white border-2 shadow-sm flex flex-col items-center text-center"
              style={{ borderColor: current.colors.dark }}
            >
              <ShieldCheck className="w-5 h-5 mb-1" style={{ color: current.colors.secondary }} />
              <span className="text-[10px] uppercase font-black opacity-75" style={{ color: current.colors.dark }}>100% Pure</span>
              <span className="text-xs font-black" style={{ color: current.colors.dark }}>Fruit Flavour</span>
            </div>
            <div 
              className="p-3 rounded-2xl bg-white border-2 shadow-sm flex flex-col items-center text-center"
              style={{ borderColor: current.colors.dark }}
            >
              <Heart className="w-5 h-5 mb-1" style={{ color: current.colors.primary }} />
              <span className="text-[10px] uppercase font-black opacity-75" style={{ color: current.colors.dark }}>Instant</span>
              <span className="text-xs font-black" style={{ color: current.colors.dark }}>Refreshment</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                onSelectFlavour(current);
                onOpenRetailerModal();
              }}
              className="px-7 py-3.5 rounded-full font-black font-sheetal text-sm text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer border-3"
              style={{
                backgroundColor: current.colors.primary,
                borderColor: current.colors.dark
              }}
            >
              <span>Explore {current.name} Packaging</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

        {/* Right Column: Front-Facing Product Display */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[340px] sm:min-h-[420px]">
          
          {/* Packaging Image Container */}
          <div className="pinned-product-box gsap-flavour-product relative z-10 w-full max-w-md h-[380px] sm:h-[440px] flex items-center justify-center p-4">
            {flavours.map((fl, idx) => (
              <img 
                key={fl.id}
                src={fl.assets.box1l} 
                alt={`${fl.name} 1L Pack`}
                className={`pinned-prod-img pinned-prod-${idx} absolute inset-0 m-auto w-full max-h-[380px] sm:max-h-[440px] object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] pointer-events-none`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'translateY(0px) scale(1)' : 'translateY(40px) scale(0.94)',
                  zIndex: idx === 0 ? 10 : 1,
                }}
              />
            ))}
          </div>

          {/* Floater Badges */}
          <div 
            className="gsap-flavour-badge absolute top-4 right-4 z-20 px-4 py-2.5 rounded-2xl bg-white border-2 shadow-md flex items-center gap-2 animate-bounce-slow"
            style={{ borderColor: current.colors.dark }}
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: current.colors.primary }}
            />
            <div className="text-left">
              <div className="text-xs font-black uppercase" style={{ color: current.colors.dark }}>{current.name} Extract</div>
              <div className="text-[10px] font-bold opacity-75" style={{ color: current.colors.dark }}>Rich Fruit Taste</div>
            </div>
          </div>

          <div 
            className="gsap-flavour-badge absolute bottom-6 left-4 z-20 px-4 py-2.5 rounded-2xl text-white text-xs font-black shadow-md flex items-center gap-2 border-2"
            style={{ backgroundColor: current.colors.dark, borderColor: current.colors.dark }}
          >
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: current.colors.primary }} />
            <span>1L Box & Party Pack Available</span>
          </div>

        </div>

      </div>

      {/* Bottom Progress Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-4">
        <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-300 rounded-full"
            style={{ 
              width: `${((currentIndex + 1) / flavours.length) * 100}%`,
              backgroundColor: current.colors.dark
            }}
          />
        </div>
      </div>
    </section>
  );
}
