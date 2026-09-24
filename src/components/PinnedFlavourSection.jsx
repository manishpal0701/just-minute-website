import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Droplets } from 'lucide-react';
import { updateFlavourThemeCSSVars } from '../animations/flavourAnimations';

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
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 769px)',
      isMobile: '(max-width: 768px)',
    }, (context) => {
      const { isDesktop } = context.conditions;

      // Set initial GSAP states: Flavour 0 is centered/visible, all others hidden
      flavours.forEach((_, idx) => {
        if (idx === 0) {
          gsap.set(`.pinned-prod-${idx}`, { y: 0, scale: 1, opacity: 1 });
        } else {
          gsap.set(`.pinned-prod-${idx}`, { y: isDesktop ? 40 : 25, scale: 0.94, opacity: 0 });
        }
      });

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: `+=${total * (isDesktop ? 95 : 85)}%`,
          scrub: 0.8,
          invalidateOnRefresh: true,
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

      const yOffset = isDesktop ? 40 : 25;

      for (let i = 0; i < total - 1; i++) {
        const startTime = i;

        pinTl.to(`.pinned-prod-${i}`, {
          y: -yOffset,
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
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => mm.revert();
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
      className="relative w-full min-h-[100dvh] lg:min-h-screen flex flex-col justify-between overflow-hidden transition-colors duration-500 py-4 lg:py-10 px-3 md:px-12"
      style={{
        backgroundColor: current.colors.background,
        color: current.colors.dark
      }}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-10 left-10 w-64 lg:w-80 h-64 lg:h-80 rounded-full blur-3xl opacity-30" 
          style={{ backgroundColor: current.colors.primary }}
        />
        <div 
          className="absolute bottom-10 right-10 w-72 lg:w-96 h-72 lg:h-96 rounded-full blur-3xl opacity-30" 
          style={{ backgroundColor: current.colors.secondary }}
        />
      </div>

      {/* Top Header & Flavour Selector */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm"
            style={{ color: current.colors.dark, borderColor: current.colors.dark }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: current.colors.primary }} />
            <span>Pinned Scroll Flavour Journey</span>
          </div>
          <h2 
            className="text-xl sm:text-2xl md:text-4xl font-black font-sheetal tracking-tight mt-1"
            style={{ color: current.colors.dark }}
          >
            7 Signature Taste Experiences
          </h2>
        </div>

        {/* Flavour Step Indicator Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {flavours.map((f, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={f.id}
                onClick={() => handleManualSelect(i, f)}
                className={`group relative px-3 py-1.5 rounded-full text-xs font-sheetal font-black transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 cursor-pointer outline-none ${
                  isActive
                    ? 'scale-105 text-white z-10 shadow-md'
                    : 'bg-white hover:scale-104 border-2'
                }`}
                style={{
                  backgroundColor: isActive ? f.colors.primary : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : f.colors.dark,
                  borderColor: f.colors.dark,
                  boxShadow: isActive ? `2px 2px 0px ${f.colors.dark}` : undefined
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

      {/* Main Content Showcase Grid / Mobile Stack */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:gap-8 items-center my-auto py-2 lg:py-6 grow">
        
        {/* Title Block */}
        <div className="w-full lg:col-span-6 flex flex-col justify-center space-y-2 lg:space-y-6 text-left">
          <div className="flex items-center justify-between">
            <div 
              className="gsap-flavour-text inline-flex items-center gap-2 px-3 py-0.5 rounded-md bg-white border text-[10px] sm:text-xs font-sheetal font-black w-fit"
              style={{ color: current.colors.dark, borderColor: `${current.colors.dark}30` }}
            >
              <span>FLAVOUR 0{currentIndex + 1} OF 07</span>
              <span>•</span>
              <span className="uppercase font-bold truncate max-w-[200px] sm:max-w-none">{current.tagline}</span>
            </div>
          </div>

          <h1 
            className="gsap-flavour-text text-3xl sm:text-5xl lg:text-7xl font-black font-sheetal tracking-tight leading-none drop-shadow-sm"
            style={{ color: current.colors.dark }}
          >
            {current.name}
          </h1>

          {/* Desktop Description */}
          <p 
            className="hidden lg:block gsap-flavour-text text-base sm:text-lg font-semibold leading-relaxed max-w-xl opacity-90"
            style={{ color: current.colors.dark }}
          >
            {current.description}
          </p>
        </div>

        {/* Central Front-Facing Product Display Container (ALWAYS VISIBLE IN MOBILE & DESKTOP) */}
        <div className="w-full lg:col-span-6 flex items-center justify-center relative min-h-[210px] sm:min-h-[300px] lg:min-h-[420px] my-1 lg:my-0">
          
          {/* Packaging Image Box */}
          <div className="pinned-product-box gsap-flavour-product relative z-10 w-full max-w-md h-[210px] sm:h-[300px] lg:h-[440px] flex items-center justify-center p-2 sm:p-4">
            {flavours.map((fl, idx) => (
              <img 
                key={fl.id}
                src={fl.assets.box1l} 
                alt={`${fl.name} 1L Pack`}
                className={`pinned-prod-img pinned-prod-${idx} absolute inset-0 m-auto w-full max-h-[190px] sm:max-h-[290px] lg:max-h-[440px] object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.12)] pointer-events-none`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'translateY(0px) scale(1)' : 'translateY(25px) scale(0.94)',
                  zIndex: idx === 0 ? 10 : 1,
                }}
              />
            ))}
          </div>

          {/* Ambient Floater Badges */}
          <div 
            className="gsap-flavour-badge absolute top-1 right-1 sm:top-4 sm:right-4 z-20 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border-2 shadow-md flex items-center gap-1.5 sm:gap-2 animate-bounce-slow text-xs"
            style={{ borderColor: current.colors.dark }}
          >
            <div 
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0"
              style={{ backgroundColor: current.colors.primary }}
            />
            <div className="text-left">
              <div className="text-[10px] sm:text-xs font-black uppercase" style={{ color: current.colors.dark }}>{current.name} Extract</div>
              <div className="text-[9px] sm:text-[10px] font-bold opacity-75" style={{ color: current.colors.dark }}>Rich Fruit Taste</div>
            </div>
          </div>

          <div 
            className="gsap-flavour-badge absolute bottom-1 left-1 sm:bottom-6 sm:left-4 z-20 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-white text-[10px] sm:text-xs font-black shadow-md flex items-center gap-1.5 border-2"
            style={{ backgroundColor: current.colors.dark, borderColor: current.colors.dark }}
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-ping shrink-0" style={{ backgroundColor: current.colors.primary }} />
            <span>1L Box & Party Pack</span>
          </div>

        </div>

        {/* Mobile Description & Attributes & CTA Block */}
        <div className="w-full lg:col-span-12 flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 lg:space-y-4">
          
          {/* Mobile Description */}
          <p 
            className="lg:hidden text-xs sm:text-sm font-semibold leading-snug max-w-lg opacity-90"
            style={{ color: current.colors.dark }}
          >
            {current.description}
          </p>

          {/* Quick Flavor Attribute Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md">
            <div 
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white border-2 shadow-sm flex flex-col items-center text-center"
              style={{ borderColor: current.colors.dark }}
            >
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" style={{ color: current.colors.primary }} />
              <span className="text-[9px] sm:text-[10px] uppercase font-black opacity-75" style={{ color: current.colors.dark }}>Mix Ratio</span>
              <span className="text-[10px] sm:text-xs font-black" style={{ color: current.colors.dark }}>1 : 5 Water</span>
            </div>
            <div 
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white border-2 shadow-sm flex flex-col items-center text-center"
              style={{ borderColor: current.colors.dark }}
            >
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" style={{ color: current.colors.secondary }} />
              <span className="text-[9px] sm:text-[10px] uppercase font-black opacity-75" style={{ color: current.colors.dark }}>100% Pure</span>
              <span className="text-[10px] sm:text-xs font-black" style={{ color: current.colors.dark }}>Fruit Flavour</span>
            </div>
            <div 
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white border-2 shadow-sm flex flex-col items-center text-center"
              style={{ borderColor: current.colors.dark }}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" style={{ color: current.colors.primary }} />
              <span className="text-[9px] sm:text-[10px] uppercase font-black opacity-75" style={{ color: current.colors.dark }}>Instant</span>
              <span className="text-[10px] sm:text-xs font-black" style={{ color: current.colors.dark }}>Refreshment</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
            <button
              onClick={() => {
                onSelectFlavour(current);
                onOpenRetailerModal();
              }}
              className="px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full font-black font-sheetal text-xs sm:text-sm text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer border-2 sm:border-3"
              style={{
                backgroundColor: current.colors.primary,
                borderColor: current.colors.dark
              }}
            >
              <span>Explore {current.name} Packaging</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Progress Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-2 shrink-0">
        <div className="w-full h-2 sm:h-2.5 bg-black/10 rounded-full overflow-hidden">
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
