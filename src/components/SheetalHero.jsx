import React, { useRef } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { initHeroEntrance, initHeroScrollTrigger } from '../animations/heroAnimations';
import { init4LayerParallaxDepth, initScrollVelocityReactivity } from '../animations/scrollAnimations';
import { initMagneticButton, initFloatingPhysics } from '../utils/gsapUtils';

export default function SheetalHero({ activeFlavour, flavours, onSelectFlavour, onOpenRetailerModal }) {
  const scopeRef = useRef(null);
  const heroPackRef = useRef(null);
  const ctaBtnRef = useRef(null);

  useGSAP(() => {
    initHeroEntrance(scopeRef);
    initHeroScrollTrigger(scopeRef);
    init4LayerParallaxDepth(scopeRef);
    initScrollVelocityReactivity(scopeRef);
    initFloatingPhysics(heroPackRef.current, 16, 3.8);
    initMagneticButton(ctaBtnRef.current, 0.4);
  }, { scope: scopeRef, dependencies: [activeFlavour.id] });

  return (
    <section 
      ref={scopeRef} 
      className="gsap-hero-container relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: activeFlavour.colors.background }}
    >
      
      {/* Background Decorative Playful Shapes (Solid Colors, No Gradients) */}
      <div className="gsap-hero-bg absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="parallax-layer-1 absolute top-12 left-12 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-40"
          style={{ backgroundColor: activeFlavour.colors.primary }} 
        />
        <div 
          className="parallax-layer-2 gsap-velocity-react absolute top-1/4 left-10 font-bubble text-8xl opacity-40 animate-bounce-slow"
          style={{ color: activeFlavour.colors.primary }}
        >
          ✦
        </div>
        <div 
          className="parallax-layer-2 gsap-velocity-react absolute bottom-1/3 right-12 font-bubble text-9xl opacity-40 animate-bounce-slow"
          style={{ color: activeFlavour.colors.secondary }}
        >
          ★
        </div>
        <div 
          className="parallax-layer-1 absolute bottom-10 left-1/3 w-32 h-32 rounded-full border-4 border-dashed pointer-events-none opacity-30"
          style={{ borderColor: activeFlavour.colors.primary }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Headline & Text (Layer 4) */}
          <div className="lg:col-span-6 text-left gsap-hero-title-box parallax-layer-4">
            
            {/* Top Badge */}
            <div 
              className="gsap-hero-badge inline-block px-5 py-2.5 text-xs sm:text-sm font-sheetal font-black tracking-wider uppercase mb-6 shadow-md border-3 rounded-full"
              style={{
                backgroundColor: activeFlavour.colors.primary,
                color: '#FFFFFF',
                borderColor: activeFlavour.colors.dark
              }}
            >
              ⚡ 100% Pure Fruit Flavour Refreshment
            </div>

            {/* Headline */}
            <div key={activeFlavour.id + '-title'} className="mb-4">
              <h1 
                className="font-sheetal font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none flex flex-wrap gap-x-4"
                style={{ color: activeFlavour.colors.dark }}
              >
                <span className="gsap-hero-word">The</span>
                <span className="gsap-hero-word">Instant</span>
                <span className="gsap-hero-word">Magic</span>
                <span className="gsap-hero-word">of</span>
                <span 
                  className="gsap-hero-word font-bubble underline decoration-wavy underline-offset-8 drop-shadow-sm"
                  style={{ color: activeFlavour.colors.primary, textDecorationColor: activeFlavour.colors.dark }}
                >
                  {activeFlavour.name}!
                </span>
              </h1>
              
              <p 
                className="gsap-hero-sub font-sheetal font-black text-2xl sm:text-3xl mt-4 mb-4"
                style={{ color: activeFlavour.colors.dark }}
              >
                {activeFlavour.tagline}
              </p>

              <p 
                className="gsap-hero-sub text-base sm:text-lg font-semibold leading-relaxed max-w-lg mb-8 opacity-90"
                style={{ color: activeFlavour.colors.dark }}
              >
                {activeFlavour.description}
              </p>
            </div>

            {/* Verified Specs Chips */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {activeFlavour.verifiedSpecs.badges.map((badge, idx) => (
                <span 
                  key={idx}
                  className="gsap-hero-badge px-4 py-2 rounded-full text-xs font-sheetal font-black bg-white border-2 shadow-sm"
                  style={{
                    color: activeFlavour.colors.dark,
                    borderColor: activeFlavour.colors.dark
                  }}
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                ref={ctaBtnRef}
                onClick={onOpenRetailerModal}
                className="gsap-hero-cta magnetic-btn px-8 py-4 rounded-full font-sheetal font-black text-sm uppercase tracking-wider text-white transition-all hover:scale-105 shadow-md flex items-center gap-2 cursor-pointer border-3"
                style={{
                  backgroundColor: activeFlavour.colors.primary,
                  borderColor: activeFlavour.colors.dark
                }}
              >
                <MapPin className="w-4 h-4" />
                <span>Find Retailers & Inquire</span>
              </button>

              <a
                href="#range"
                className="gsap-hero-cta px-7 py-4 rounded-full font-sheetal font-black text-xs uppercase tracking-wider bg-white transition-all border-2 flex items-center gap-2 shadow-sm hover:scale-105"
                style={{
                  color: activeFlavour.colors.dark,
                  borderColor: activeFlavour.colors.dark
                }}
              >
                <span>View Range ({activeFlavour.verifiedSpecs.price1L} / {activeFlavour.verifiedSpecs.price5L})</span>
              </a>
            </div>

            {/* Flavour Atmosphere Switcher Tabs */}
            <div className="gsap-hero-pills">
              <div 
                className="text-xs sm:text-sm font-sheetal font-black tracking-widest uppercase flex items-center gap-2 mb-3.5"
                style={{ color: activeFlavour.colors.dark }}
              >
                <Sparkles className="w-4 h-4 animate-pulse" style={{ color: activeFlavour.colors.primary }} />
                <span>SELECT FLAVOUR ATMOSPHERE:</span>
              </div>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {flavours.map((fl) => {
                  const isActive = fl.id === activeFlavour.id;
                  return (
                    <button
                      key={fl.id}
                      onClick={() => onSelectFlavour(fl)}
                      className={`group relative px-4 sm:px-4.5 py-2 rounded-full text-xs sm:text-sm font-sheetal font-black transition-all duration-300 flex items-center gap-2 cursor-pointer outline-none ${
                        isActive
                          ? 'scale-110 text-white z-10 shadow-md'
                          : 'bg-white hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: isActive ? fl.colors.primary : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : fl.colors.dark,
                        border: `2px solid ${fl.colors.dark}`,
                        boxShadow: isActive ? `4px 4px 0px ${fl.colors.dark}` : '0 2px 8px rgba(0,0,0,0.06)'
                      }}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
                        style={{ 
                          backgroundColor: isActive ? '#FFFFFF' : fl.colors.primary,
                          color: fl.colors.dark
                        }}
                      >
                        {isActive && <span className="text-[9px] font-black">✓</span>}
                      </span>
                      <span className="tracking-wide whitespace-nowrap">{fl.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Floating Product Packaging Display (Layer 3) */}
          <div className="lg:col-span-6 flex justify-center py-6 relative parallax-layer-3">
            <div 
              ref={heroPackRef}
              className="gsap-hero-pack relative z-10 w-full max-w-md flex justify-center"
            >
              <div className="relative group">
                <img
                  src={activeFlavour.assets.box1l}
                  alt={`Just Minute ${activeFlavour.name}`}
                  className="max-h-[460px] sm:max-h-[520px] object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)]"
                />

                {/* Solid Callout Badge */}
                <div 
                  className="gsap-hero-badge absolute -bottom-4 right-0 sm:right-4 px-6 py-3.5 text-center shadow-md border-3 rounded-2xl"
                  style={{
                    backgroundColor: activeFlavour.colors.primary,
                    color: '#FFFFFF',
                    borderColor: activeFlavour.colors.dark
                  }}
                >
                  <div className="font-bubble text-xs uppercase font-bold text-white">1 Litre Pack</div>
                  <div className="font-sheetal font-black text-2xl text-white">Only {activeFlavour.verifiedSpecs.price1L}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
