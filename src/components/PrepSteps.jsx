import React, { useRef, useState } from 'react';
import { Droplet, PlusCircle, RefreshCw, Snowflake, Sparkles, ArrowDown, Zap, Heart } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PrepSteps({ activeFlavour }) {
  const containerRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Dynamic packaging & liquid colors
  const liquidColor = activeFlavour?.colors?.primary || '#FF9E00';
  const flavourName = activeFlavour?.name || 'Mango';

  const stepsList = [
    {
      id: '01',
      title: 'POUR',
      subtitle: 'Chilled Mineral Water Base',
      desc: 'Fill pitcher with cold, crisp mineral water base.',
      icon: Droplet
    },
    {
      id: '02',
      title: 'ADD',
      subtitle: `Just Minute ${flavourName} Powder`,
      desc: 'Empty 1 authentic sachet into water.',
      icon: PlusCircle
    },
    {
      id: '03',
      title: 'STIR',
      subtitle: '10 Seconds Instant Vortex',
      desc: 'Stir gently. Blends with zero residue.',
      icon: RefreshCw
    },
    {
      id: '04',
      title: 'CHILL',
      subtitle: 'Ice Cubes & Fresh Mint Leaf',
      desc: 'Drop crystal ice cubes for artisan serve.',
      icon: Snowflake
    },
    {
      id: '05',
      title: 'SERVE',
      subtitle: '100% Pure Fruit Joy Ready!',
      desc: 'Enjoy gourmet fruit refreshment.',
      icon: Sparkles
    }
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Kill any existing ScrollTrigger instance for the preparation section
    const existingST = ScrollTrigger.getById('prep-scroll-trigger');
    if (existingST) {
      existingST.kill(true);
    }

    setActiveStepIndex(0);

    const stageElements = containerRef.current.querySelectorAll(
      '.demo-water-bottle, .demo-water-stream, .demo-pack-sachet, .demo-powder-stream, .demo-stir-spoon, .demo-vortex-ring, .demo-ice-1, .demo-ice-2, .demo-mint, .demo-splash-wave, .demo-final-aura, .demo-sparkle-burst, .demo-final-badge, .demo-outro-bar, .demo-glass-liquid, .step-node-01, .step-node-02, .step-node-03, .step-node-04, .step-node-05, .demo-arrow-1, .demo-arrow-2, .demo-arrow-3, .demo-arrow-4, .mobile-step-pill-01, .mobile-step-pill-02, .mobile-step-pill-03, .mobile-step-pill-04, .mobile-step-pill-05'
    );

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 769px)',
      isMobile: '(max-width: 768px)',
    }, (context) => {
      const { isDesktop } = context.conditions;

      gsap.set(stageElements, { clearProps: 'transform,opacity,height,scale,rotate,x,y' });

      if (isDesktop) {
        // ---------------------------------------------------------------------
        // DESKTOP GSAP INITIAL STATES
        // ---------------------------------------------------------------------
        gsap.set('.demo-water-bottle', { x: 120, y: -40, rotate: 0, opacity: 0 });
        gsap.set('.demo-water-stream', { height: 0, opacity: 0 });
        gsap.set('.demo-pack-sachet', { x: 140, y: -40, rotate: 0, opacity: 0 });
        gsap.set('.demo-powder-stream', { height: 0, opacity: 0 });
        gsap.set('.demo-stir-spoon', { y: -160, rotate: 0, opacity: 0 });
        gsap.set('.demo-vortex-ring', { rotate: 0, scale: 0.6, opacity: 0 });
        gsap.set('.demo-ice-1', { y: -80, opacity: 0, rotate: 0 });
        gsap.set('.demo-ice-2', { y: -80, opacity: 0, rotate: 0 });
        gsap.set('.demo-mint', { y: -80, opacity: 0, rotate: 0 });
        gsap.set('.demo-splash-wave', { scale: 0.5, opacity: 0 });
        gsap.set('.demo-final-aura', { scale: 0.8, opacity: 0 });
        gsap.set('.demo-sparkle-burst', { scale: 0.8, opacity: 0 });
        gsap.set('.demo-final-badge', { y: 30, opacity: 0 });
        gsap.set('.demo-outro-bar', { y: 20, opacity: 0 });
        gsap.set('.demo-glass-liquid', { height: '0%', backgroundColor: '#7BE0E8' });

        gsap.set('.step-node-01', { scale: 1.05, opacity: 1 });
        gsap.set('.step-node-02', { scale: 1, opacity: 0.8 });
        gsap.set('.step-node-03', { scale: 1, opacity: 0.8 });
        gsap.set('.step-node-04', { scale: 1, opacity: 0.8 });
        gsap.set('.step-node-05', { scale: 1, opacity: 0.8 });

        gsap.set('.demo-arrow-1', { scale: 1.15, opacity: 1 });
        gsap.set('.demo-arrow-2', { scale: 1, opacity: 0.7 });
        gsap.set('.demo-arrow-3', { scale: 1, opacity: 0.7 });
        gsap.set('.demo-arrow-4', { scale: 1, opacity: 0.7 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'prep-scroll-trigger',
            trigger: containerRef.current,
            pin: true,
            pinSpacing: true,
            start: 'top top',
            end: '+=250%',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(4, Math.floor(self.progress * 4.99));
              setActiveStepIndex((prev) => (prev !== idx ? idx : prev));
            },
          },
        });

        tl.to('.step-node-01', { scale: 1.05, opacity: 1, duration: 0.4 }, 0)
          .to('.demo-arrow-1', { opacity: 1, scale: 1.15, duration: 0.4 }, 0)
          .to('.demo-water-bottle', { x: 0, y: 0, rotate: -35, opacity: 1, duration: 0.6 }, 0)
          .to('.demo-water-stream', { height: 170, opacity: 1, duration: 0.5 }, 0.2)
          .to('.demo-glass-liquid', { height: '35%', backgroundColor: '#7BE0E8', duration: 0.8 }, 0.2)

          .to('.step-node-01', { scale: 1, opacity: 0.8, duration: 0.4 }, 0.8)
          .to('.step-node-02', { scale: 1.05, opacity: 1, duration: 0.4 }, 0.8)
          .to('.demo-arrow-1', { scale: 1, opacity: 0.7 }, 0.8)
          .to('.demo-arrow-2', { opacity: 1, scale: 1.15, duration: 0.4 }, 0.8)
          .to('.demo-water-bottle', { x: 80, y: -60, opacity: 0, rotate: 0, duration: 0.5 }, 0.8)
          .to('.demo-water-stream', { height: 0, opacity: 0, duration: 0.3 }, 0.8)
          .to('.demo-pack-sachet', { x: 0, y: 0, rotate: -25, opacity: 1, duration: 0.6 }, 1.0)
          .to('.demo-powder-stream', { height: 160, opacity: 1, duration: 0.5 }, 1.2)
          .to('.demo-glass-liquid', { height: '65%', backgroundColor: liquidColor, duration: 0.8 }, 1.2)

          .to('.step-node-02', { scale: 1, opacity: 0.8, duration: 0.4 }, 1.6)
          .to('.step-node-03', { scale: 1.05, opacity: 1, duration: 0.4 }, 1.6)
          .to('.demo-arrow-2', { scale: 1, opacity: 0.7 }, 1.6)
          .to('.demo-arrow-3', { opacity: 1, scale: 1.15, duration: 0.4 }, 1.6)
          .to('.demo-pack-sachet', { x: 80, y: -60, opacity: 0, duration: 0.5 }, 1.6)
          .to('.demo-powder-stream', { height: 0, opacity: 0, duration: 0.3 }, 1.6)
          .to('.demo-stir-spoon', { y: 35, opacity: 1, duration: 0.6 }, 1.8)
          .to('.demo-stir-spoon', { rotate: 720, duration: 1.0 }, 2.0)
          .to('.demo-vortex-ring', { rotate: 1080, scale: 1.3, opacity: 0.9, duration: 1.0 }, 2.0)
          .to('.demo-glass-liquid', { height: '82%', duration: 0.6 }, 2.0)

          .to('.step-node-03', { scale: 1, opacity: 0.8, duration: 0.4 }, 2.6)
          .to('.step-node-04', { scale: 1.05, opacity: 1, duration: 0.4 }, 2.6)
          .to('.demo-arrow-3', { scale: 1, opacity: 0.7 }, 2.6)
          .to('.demo-arrow-4', { opacity: 1, scale: 1.15, duration: 0.4 }, 2.6)
          .to('.demo-stir-spoon', { y: -140, opacity: 0, duration: 0.5 }, 2.6)
          .to('.demo-vortex-ring', { opacity: 0, scale: 0.6, duration: 0.3 }, 2.6)
          .to('.demo-ice-1', { y: 190, opacity: 1, rotate: 20, duration: 0.5 }, 2.8)
          .to('.demo-ice-2', { y: 210, opacity: 1, rotate: -25, duration: 0.5 }, 2.9)
          .to('.demo-mint', { y: 170, opacity: 1, rotate: 15, duration: 0.5 }, 3.0)
          .to('.demo-splash-wave', { scale: 1.6, opacity: 0.9, duration: 0.4 }, 3.0)
          .to('.demo-glass-liquid', { height: '98%', duration: 0.5 }, 3.0)

          .to('.step-node-04', { scale: 1, opacity: 0.8, duration: 0.4 }, 3.4)
          .to('.step-node-05', { scale: 1.1, opacity: 1, duration: 0.4 }, 3.4)
          .to('.demo-arrow-4', { scale: 1, opacity: 0.7 }, 3.4)
          .to('.demo-final-aura', { opacity: 1, scale: 1.3, duration: 0.6 }, 3.4)
          .to('.demo-sparkle-burst', { opacity: 1, scale: 1.25, duration: 0.6 }, 3.4)
          .to('.demo-final-badge', { opacity: 1, y: 0, duration: 0.6 }, 3.5)
          .to('.demo-outro-bar', { opacity: 1, y: 0, duration: 0.5 }, 3.7);

      } else {
        // ---------------------------------------------------------------------
        // MOBILE GSAP INITIAL STATES & TIMELINE (Compact Viewport Offsets)
        // ---------------------------------------------------------------------
        gsap.set('.demo-water-bottle', { x: 60, y: -20, rotate: 0, opacity: 0 });
        gsap.set('.demo-water-stream', { height: 0, opacity: 0 });
        gsap.set('.demo-pack-sachet', { x: 70, y: -20, rotate: 0, opacity: 0 });
        gsap.set('.demo-powder-stream', { height: 0, opacity: 0 });
        gsap.set('.demo-stir-spoon', { y: -120, rotate: 0, opacity: 0 });
        gsap.set('.demo-vortex-ring', { rotate: 0, scale: 0.5, opacity: 0 });
        gsap.set('.demo-ice-1', { y: -50, opacity: 0, rotate: 0 });
        gsap.set('.demo-ice-2', { y: -50, opacity: 0, rotate: 0 });
        gsap.set('.demo-mint', { y: -50, opacity: 0, rotate: 0 });
        gsap.set('.demo-splash-wave', { scale: 0.5, opacity: 0 });
        gsap.set('.demo-final-aura', { scale: 0.8, opacity: 0 });
        gsap.set('.demo-sparkle-burst', { scale: 0.8, opacity: 0 });
        gsap.set('.demo-final-badge', { y: 20, opacity: 0 });
        gsap.set('.demo-outro-bar', { y: 15, opacity: 0 });
        gsap.set('.demo-glass-liquid', { height: '0%', backgroundColor: '#7BE0E8' });

        gsap.set('.mobile-step-pill-01', { scale: 1.05, opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'prep-scroll-trigger',
            trigger: containerRef.current,
            pin: true,
            pinSpacing: true,
            start: 'top top',
            end: '+=220%',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(4, Math.floor(self.progress * 4.99));
              setActiveStepIndex((prev) => (prev !== idx ? idx : prev));
            },
          },
        });

        tl.to('.demo-water-bottle', { x: 0, y: 0, rotate: -30, opacity: 1, duration: 0.6 }, 0)
          .to('.demo-water-stream', { height: 110, opacity: 1, duration: 0.5 }, 0.2)
          .to('.demo-glass-liquid', { height: '35%', backgroundColor: '#7BE0E8', duration: 0.8 }, 0.2)

          .to('.demo-water-bottle', { x: 50, y: -40, opacity: 0, rotate: 0, duration: 0.5 }, 0.8)
          .to('.demo-water-stream', { height: 0, opacity: 0, duration: 0.3 }, 0.8)
          .to('.demo-pack-sachet', { x: 0, y: 0, rotate: -20, opacity: 1, duration: 0.6 }, 1.0)
          .to('.demo-powder-stream', { height: 100, opacity: 1, duration: 0.5 }, 1.2)
          .to('.demo-glass-liquid', { height: '65%', backgroundColor: liquidColor, duration: 0.8 }, 1.2)

          .to('.demo-pack-sachet', { x: 50, y: -40, opacity: 0, duration: 0.5 }, 1.6)
          .to('.demo-powder-stream', { height: 0, opacity: 0, duration: 0.3 }, 1.6)
          .to('.demo-stir-spoon', { y: 25, opacity: 1, duration: 0.6 }, 1.8)
          .to('.demo-stir-spoon', { rotate: 720, duration: 1.0 }, 2.0)
          .to('.demo-vortex-ring', { rotate: 1080, scale: 1.1, opacity: 0.9, duration: 1.0 }, 2.0)
          .to('.demo-glass-liquid', { height: '82%', duration: 0.6 }, 2.0)

          .to('.demo-stir-spoon', { y: -100, opacity: 0, duration: 0.5 }, 2.6)
          .to('.demo-vortex-ring', { opacity: 0, scale: 0.5, duration: 0.3 }, 2.6)
          .to('.demo-ice-1', { y: 130, opacity: 1, rotate: 20, duration: 0.5 }, 2.8)
          .to('.demo-ice-2', { y: 145, opacity: 1, rotate: -25, duration: 0.5 }, 2.9)
          .to('.demo-mint', { y: 115, opacity: 1, rotate: 15, duration: 0.5 }, 3.0)
          .to('.demo-splash-wave', { scale: 1.4, opacity: 0.9, duration: 0.4 }, 3.0)
          .to('.demo-glass-liquid', { height: '98%', duration: 0.5 }, 3.0)

          .to('.demo-final-aura', { opacity: 1, scale: 1.2, duration: 0.6 }, 3.4)
          .to('.demo-sparkle-burst', { opacity: 1, scale: 1.15, duration: 0.6 }, 3.4)
          .to('.demo-final-badge', { opacity: 1, y: 0, duration: 0.6 }, 3.5)
          .to('.demo-outro-bar', { opacity: 1, y: 0, duration: 0.5 }, 3.7);
      }
    });

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    const timerId = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      cancelAnimationFrame(refreshId);
      clearTimeout(timerId);
      mm.revert();
    };
  }, { scope: containerRef, dependencies: [activeFlavour?.id] });

  const handleImageLoad = () => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };

  const ActiveIcon = stepsList[activeStepIndex]?.icon || Droplet;

  return (
    <section 
      ref={containerRef} 
      id="prep" 
      className="relative min-h-[100dvh] md:min-h-screen w-full flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-8 overflow-hidden z-10 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: activeFlavour?.colors?.background || '#FFF6DB',
        color: activeFlavour?.colors?.dark || '#3E1A00'
      }}
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between h-full grow min-h-[92vh]">
        
        {/* Top Bar Header & Active Step Indicator */}
        <div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 sm:pb-3 border-b-2 shrink-0"
          style={{ borderColor: `${activeFlavour?.colors?.dark || '#3E1A00'}20` }}
        >
          <div className="text-left">
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-sheetal font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-sm border-2 text-white"
              style={{
                backgroundColor: activeFlavour?.colors?.primary || '#FF9800',
                borderColor: activeFlavour?.colors?.dark || '#3E1A00'
              }}
            >
              <Zap className="w-3.5 h-3.5 fill-white animate-pulse" />
              <span>Scroll-Driven Product Demonstration</span>
            </div>
            <h2 
              className="font-sheetal font-black text-2xl sm:text-4xl md:text-5xl tracking-tight mt-1"
              style={{ color: activeFlavour?.colors?.dark || '#3E1A00' }}
            >
              How Just Minute Juice is Prepared
            </h2>
          </div>

          {/* Active Step Indicator Pill (Desktop / Tablet) */}
          <div 
            className="hidden sm:flex items-center gap-3 bg-white border-3 px-4 py-2 rounded-full shadow-md shrink-0"
            style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
          >
            <span 
              className="font-sheetal font-black text-xs uppercase tracking-widest"
              style={{ color: activeFlavour?.colors?.primary || '#FF9800' }}
            >
              ACTIVE STEP:
            </span>
            <span 
              className="font-sheetal font-black text-sm sm:text-base"
              style={{ color: activeFlavour?.colors?.dark || '#3E1A00' }}
            >
              {stepsList[activeStepIndex]?.id} — {stepsList[activeStepIndex]?.title}
            </span>
          </div>
        </div>

        {/* MOBILE STEP INDICATOR BAR & ACTIVE HERO CARD (< 769px) */}
        <div className="md:hidden flex flex-col gap-2 my-2 shrink-0">
          
          {/* Step Dots/Pills Navigation */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 no-scrollbar">
            {stepsList.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.id}
                  className={`mobile-step-pill-${step.id} flex-1 py-1.5 px-2 rounded-xl border-2 flex items-center justify-center gap-1 text-[11px] font-sheetal font-black transition-all duration-300 ${
                    isActive ? 'shadow-md text-white scale-102' : 'bg-white/80 opacity-70'
                  }`}
                  style={{
                    backgroundColor: isActive ? (activeFlavour?.colors?.primary || '#FF9800') : '#FFFFFF',
                    borderColor: activeFlavour?.colors?.dark || '#3E1A00',
                    color: isActive ? '#FFFFFF' : (activeFlavour?.colors?.dark || '#3E1A00')
                  }}
                >
                  <span>{step.id}</span>
                  <span className="truncate">{step.title}</span>
                </div>
              );
            })}
          </div>

          {/* Compact Active Step Hero Box */}
          <div 
            className="p-3 rounded-2xl border-3 shadow-md flex items-center justify-between transition-colors duration-300 bg-white"
            style={{
              borderColor: activeFlavour?.colors?.dark || '#3E1A00',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center font-sheetal font-black text-sm border-2 shadow-sm shrink-0 text-white"
                style={{
                  backgroundColor: activeFlavour?.colors?.primary || '#FF9800',
                  borderColor: activeFlavour?.colors?.dark || '#3E1A00'
                }}
              >
                {stepsList[activeStepIndex]?.id}
              </div>
              <div className="text-left">
                <div className="font-sheetal font-black text-base leading-tight flex items-center gap-2" style={{ color: activeFlavour?.colors?.dark || '#3E1A00' }}>
                  <span>{stepsList[activeStepIndex]?.title}</span>
                  <span className="text-[10px] font-bold opacity-75">• {stepsList[activeStepIndex]?.subtitle}</span>
                </div>
                <p className="text-xs font-semibold opacity-85 leading-snug" style={{ color: activeFlavour?.colors?.dark || '#3E1A00' }}>
                  {stepsList[activeStepIndex]?.desc}
                </p>
              </div>
            </div>
            <ActiveIcon className="w-6 h-6 animate-pulse shrink-0 ml-2" style={{ color: activeFlavour?.colors?.primary || '#FF9800' }} />
          </div>

        </div>

        {/* Main Demonstration Stage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center my-auto py-2 grow">
          
          {/* Left Column (DESKTOP ONLY 01 -> 05 Timeline, hidden on mobile) */}
          <div className="hidden md:flex md:col-span-5 flex-col space-y-2.5 sm:space-y-3 relative">
            
            {stepsList.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStepIndex;

              return (
                <React.Fragment key={step.id}>
                  {/* Step Node Box */}
                  <div 
                    className={`step-node-${step.id} transition-all duration-300 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between border-3 cursor-pointer shadow-sm relative overflow-hidden ${
                      isActive 
                        ? 'scale-105 z-20 shadow-md text-white' 
                        : 'bg-white'
                    }`}
                    style={{
                      backgroundColor: isActive ? (activeFlavour?.colors?.primary || '#FF9800') : '#FFFFFF',
                      borderColor: activeFlavour?.colors?.dark || '#3E1A00',
                      color: isActive ? '#FFFFFF' : (activeFlavour?.colors?.dark || '#3E1A00')
                    }}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Step Number Badge */}
                      <div 
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-sheetal font-black text-base sm:text-lg border-2 shadow-sm shrink-0"
                        style={{
                          backgroundColor: isActive ? (activeFlavour?.colors?.dark || '#3E1A00') : (activeFlavour?.colors?.background || '#FFF6DB'),
                          color: isActive ? '#FFFFFF' : (activeFlavour?.colors?.dark || '#3E1A00'),
                          borderColor: activeFlavour?.colors?.dark || '#3E1A00'
                        }}
                      >
                        {step.id}
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-sheetal font-black text-lg sm:text-xl tracking-wide"
                            style={{ color: isActive ? '#FFFFFF' : (activeFlavour?.colors?.dark || '#3E1A00') }}
                          >
                            {step.title}
                          </span>
                          <span 
                            className="text-[10px] font-sheetal font-bold px-2 py-0.5 rounded border uppercase"
                            style={{ 
                              backgroundColor: isActive ? '#FFFFFF22' : (activeFlavour?.colors?.background || '#FFF6DB'),
                              color: isActive ? '#FFFFFF' : (activeFlavour?.colors?.dark || '#3E1A00'),
                              borderColor: `${activeFlavour?.colors?.dark || '#3E1A00'}30`
                            }}
                          >
                            {step.subtitle}
                          </span>
                        </div>
                        <p 
                          className="text-xs font-semibold mt-0.5 line-clamp-1 opacity-80"
                          style={{ color: isActive ? '#FFFFFF' : (activeFlavour?.colors?.dark || '#3E1A00') }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${isActive ? 'animate-pulse text-white' : ''}`} style={{ color: isActive ? '#FFFFFF' : (activeFlavour?.colors?.dark || '#3E1A00') }} />
                  </div>

                  {/* Connecting Arrow between steps */}
                  {idx < stepsList.length - 1 && (
                    <div className={`demo-arrow-${idx + 1} opacity-70 flex justify-center py-0.25 transition-all duration-300`}>
                      <div 
                        className="w-7 h-7 rounded-full text-white flex items-center justify-center border-2 shadow-sm"
                        style={{
                          backgroundColor: activeFlavour?.colors?.primary || '#FF9800',
                          borderColor: activeFlavour?.colors?.dark || '#3E1A00'
                        }}
                      >
                        <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}

          </div>

          {/* Right Column / Center: Dynamic Interactive Glass Canvas (ALWAYS VISIBLE IN MOBILE & DESKTOP) */}
          <div className="col-span-1 md:col-span-7 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[420px]">
            
            {/* Background Stage Glow */}
            <div 
              className="demo-final-aura absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-25"
              style={{ backgroundColor: liquidColor }} 
            />

            {/* Stage Showcase Area */}
            <div className="relative w-full max-w-lg h-[310px] sm:h-[400px] md:h-[440px] flex items-center justify-center">

              {/* 1. Water Bottle / Pitcher (Step 01 Element) */}
              <div className="demo-water-bottle absolute -top-4 right-1 sm:-top-8 sm:right-8 z-30 pointer-events-none">
                <div 
                  className="w-18 h-36 sm:w-24 sm:h-48 bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-3 p-1.5 sm:p-2 flex flex-col items-center justify-center shadow-md"
                  style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
                >
                  <div className="w-10 h-5 sm:w-12 sm:h-6 bg-[#7BE0E8] rounded-t-lg mb-1 sm:mb-2" />
                  <Droplet className="w-7 h-7 sm:w-10 sm:h-10 text-[#7BE0E8] animate-bounce" />
                  <span className="text-[9px] sm:text-[10px] font-sheetal font-black uppercase mt-1 sm:mt-2" style={{ color: activeFlavour?.colors?.dark || '#3E1A00' }}>Mineral Water</span>
                </div>
              </div>

              {/* Water Stream (Step 01 Animation) */}
              <div 
                className="demo-water-stream absolute top-12 right-20 sm:top-16 sm:right-36 w-3 sm:w-4 bg-[#7BE0E8] rounded-full z-20 pointer-events-none border"
                style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }} 
              />

              {/* 2. Product Sachet Pack (Step 02 Element) */}
              <div className="demo-pack-sachet absolute -top-6 right-2 sm:-top-10 sm:right-10 z-30 pointer-events-none">
                <img 
                  key={activeFlavour?.id || 'mango'}
                  src={activeFlavour?.assets?.box1l || '/assets/products/box-1l-mango.png'} 
                  alt={flavourName}
                  onLoad={handleImageLoad}
                  className="w-24 h-34 sm:w-32 sm:h-44 object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.12)]"
                />
              </div>

              {/* Powder Stream (Step 02 Animation) */}
              <div 
                className="demo-powder-stream absolute top-14 right-20 sm:top-20 sm:right-32 w-4 sm:w-5 rounded-full z-20 pointer-events-none border"
                style={{ backgroundColor: liquidColor, borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
              />

              {/* 3. Stirring Spoon (Step 03 Element) */}
              <div className="demo-stir-spoon absolute -top-20 sm:-top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div 
                  className="w-3.5 h-48 sm:w-4 sm:h-64 bg-slate-300 rounded-full border-2 shadow-md flex flex-col items-center justify-end pb-2"
                  style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
                >
                  <div className="w-6 h-8 sm:w-8 sm:h-10 rounded-full bg-slate-200 border shadow-inner" style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }} />
                </div>
              </div>

              {/* Vortex Swirl Ring inside Glass (Step 03) */}
              <div 
                className="demo-vortex-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 border-3 sm:border-4 border-dashed rounded-full z-20 pointer-events-none"
                style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }} 
              />

              {/* 4. Ice Cubes & Mint Leaf (Step 04 Elements) */}
              <div className="demo-ice-1 absolute top-0 left-1/4 sm:left-1/3 z-20 pointer-events-none">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl border-2 shadow-md flex items-center justify-center rotate-12"
                  style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
                >
                  <Snowflake className="w-4 h-4 sm:w-5 sm:h-5 text-[#7BE0E8]" />
                </div>
              </div>

              <div className="demo-ice-2 absolute top-0 right-1/4 sm:right-1/3 z-20 pointer-events-none">
                <div 
                  className="w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-xl border-2 shadow-md flex items-center justify-center -rotate-12"
                  style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
                >
                  <Snowflake className="w-4 h-4 sm:w-6 sm:h-6 text-[#7BE0E8]" />
                </div>
              </div>

              <div className="demo-mint absolute top-0 left-1/2 z-20 pointer-events-none">
                <div 
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-[#72C96B] rounded-full border-2 flex items-center justify-center shadow-md text-xs sm:text-base"
                  style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
                >
                  🍃
                </div>
              </div>

              {/* Splash Wave effect */}
              <div 
                className="demo-splash-wave absolute top-1/3 left-1/2 -translate-x-1/2 w-36 sm:w-48 h-6 sm:h-8 rounded-full bg-white/60 blur-sm z-20 pointer-events-none border"
                style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
              />

              {/* Central 3D Drink Glass Container */}
              <div 
                className="relative w-44 h-64 sm:w-56 sm:h-80 rounded-b-3xl border-3 sm:border-4 bg-white shadow-lg overflow-hidden flex flex-col justify-end p-2 z-10"
                style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
              >
                
                {/* Glass Rim */}
                <div 
                  className="absolute top-0 left-0 right-0 h-3 sm:h-4 border-b-2 bg-white/60"
                  style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
                />

                {/* Dynamic Filling Liquid Layer */}
                <div 
                  className="demo-glass-liquid w-full rounded-b-2xl transition-all duration-300 relative overflow-hidden flex items-start justify-center"
                  style={{ 
                    height: '0%', 
                    backgroundColor: '#7BE0E8',
                  }}
                >
                  {/* Liquid Wave Ripple Motion */}
                  <div className="w-full h-3 bg-white/40 rounded-full animate-pulse" />
                </div>

                {/* Glass Reflection Highlight */}
                <div className="absolute inset-y-0 left-2 w-3 sm:w-4 border-l-2 pointer-events-none opacity-20" style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }} />
              </div>

              {/* 5. Final Reveal Sparkles & Badge (Step 05 Element) */}
              <div className="demo-sparkle-burst absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                <div className="absolute -top-4 left-4 sm:-top-6 sm:left-6 font-bubble text-3xl sm:text-4xl animate-bounce" style={{ color: activeFlavour?.colors?.primary || '#FF9800' }}>
                  ✦
                </div>
                <div className="absolute top-8 right-2 sm:top-10 sm:right-4 font-bubble text-4xl sm:text-5xl animate-bounce" style={{ color: activeFlavour?.colors?.primary || '#FF9800' }}>
                  ★
                </div>
              </div>

              <div className="demo-final-badge absolute -bottom-2 sm:-bottom-4 z-40 max-w-[95%] sm:max-w-none">
                <div 
                  className="px-4 py-2 sm:px-7 sm:py-3.5 border-2 sm:border-3 shadow-md flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-white"
                  style={{ borderColor: activeFlavour?.colors?.dark || '#3E1A00' }}
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current animate-pulse shrink-0" style={{ color: activeFlavour?.colors?.primary || '#FF9800' }} />
                  <div className="text-left">
                    <div className="font-bubble text-sm sm:text-xl leading-tight sm:leading-none" style={{ color: activeFlavour?.colors?.dark || '#3E1A00' }}>
                      Ready to Enjoy in Under 60 Seconds!
                    </div>
                    <div className="font-sheetal font-black text-[10px] sm:text-xs uppercase tracking-wider mt-0.5 sm:mt-1 opacity-85" style={{ color: activeFlavour?.colors?.dark || '#3E1A00' }}>
                      100% Pure {flavourName} Fruit Drink • 1L @ ₹15/- & 5L @ ₹70/-
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Transition Guide Bar into Mixology Studio */}
        <div 
          className="demo-outro-bar pt-2 sm:pt-3 border-t-2 flex items-center justify-between text-[10px] sm:text-xs font-sheetal font-black uppercase tracking-wider shrink-0 mt-auto"
          style={{ borderColor: `${activeFlavour?.colors?.dark || '#3E1A00'}20`, color: activeFlavour?.colors?.dark || '#3E1A00' }}
        >
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" style={{ color: activeFlavour?.colors?.primary || '#FF9800' }} />
            <span className="truncate">Preparation Complete • Transitioning to Mixology Studio</span>
          </span>
          <span className="flex items-center gap-1 shrink-0 ml-2">
            <span>Scroll for Mixology</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" style={{ color: activeFlavour?.colors?.dark || '#3E1A00' }} />
          </span>
        </div>

      </div>
    </section>
  );
}
