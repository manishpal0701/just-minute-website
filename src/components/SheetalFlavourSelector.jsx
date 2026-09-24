import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flame } from 'lucide-react';

export default function SheetalFlavourSelector({ activeFlavour, flavours, onSelectFlavour }) {
  const [hoveredFlavour, setHoveredFlavour] = useState(null);

  const sectionRef = useRef(null);
  const sectionBadgeRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Auto-scroll controls
  const isAutoScrollPausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  // Duplicate flavours for 100% seamless infinite looping (14 cards total)
  const displayFlavours = [...flavours, ...flavours];

  // Helper to schedule auto-scroll resumption after user interaction
  const scheduleAutoScrollResume = (delay = 2500) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isAutoScrollPausedRef.current = false;
    }, delay);
  };

  const pauseAutoScroll = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    isAutoScrollPausedRef.current = true;
  };

  // 1. Atmosphere GSAP Color Preview on Hover
  useEffect(() => {
    const targetFlavour = hoveredFlavour || activeFlavour;
    if (!targetFlavour || !targetFlavour.colors) return;
    const { colors } = targetFlavour;

    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundColor: colors.background,
        color: colors.dark,
        duration: 1.0,
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    }

    if (sectionBadgeRef.current) {
      gsap.to(sectionBadgeRef.current, {
        backgroundColor: colors.primary,
        borderColor: colors.dark,
        duration: 1.0,
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    }

    if (headingRef.current && subheadingRef.current) {
      gsap.to([headingRef.current, subheadingRef.current], {
        color: colors.dark,
        duration: 1.0,
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    }
  }, [hoveredFlavour, activeFlavour]);

  // 2. GSAP 3D Rolling Slide Effect on Horizontal Scroll
  const updateScroll3DRoll = () => {
    if (!sliderTrackRef.current) return;
    const container = sliderTrackRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxRot = isMobile ? 4 : 8; // Subtle 3D Y-rotation (±4deg on mobile, ±8deg on desktop)

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const flavour = displayFlavours[idx];
      // Skip 3D scroll update if card is currently hovered to preserve hover tilt
      if (hoveredFlavour && flavour && flavour.id === hoveredFlavour.id) return;

      const cardCenter = cardEl.offsetLeft + cardEl.clientWidth / 2;
      const distance = cardCenter - containerCenter; // Distance from center
      const maxDist = container.clientWidth / 1.5;
      const normalizedDist = Math.max(-1, Math.min(1, distance / maxDist)); // Range -1 to 1

      const targetRotateY = normalizedDist * maxRot; // Smooth Y-axis roll
      const targetScale = 1.0 - Math.abs(normalizedDist) * 0.05; // 1.0 center -> 0.95 edge
      const targetY = Math.abs(normalizedDist) * 4;

      gsap.to(cardEl, {
        rotationY: targetRotateY,
        scale: targetScale,
        y: targetY,
        transformPerspective: 1200,
        duration: 0.3,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    });
  };

  // 3. GSAP Ticker Continuous Slow Auto-Scroll + Infinite Wrapping Loop
  useEffect(() => {
    const container = sliderTrackRef.current;
    if (!container) return;

    const scrollSpeed = 0.75; // Smooth luxury auto-scroll speed (px/frame)

    const tick = () => {
      if (!container) return;

      // Handle Infinite Wrapping loop seamlessly
      const singleSetWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= singleSetWidth) {
        container.scrollLeft -= singleSetWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += singleSetWidth;
      }

      // Auto scroll right-to-left continuously if not paused or dragging
      if (!isAutoScrollPausedRef.current && !isDraggingRef.current) {
        container.scrollLeft += scrollSpeed;
      }

      updateScroll3DRoll();
    };

    gsap.ticker.add(tick);

    const handleScroll = () => {
      updateScroll3DRoll();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll3DRoll();

    return () => {
      gsap.ticker.remove(tick);
      container.removeEventListener('scroll', handleScroll);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [hoveredFlavour]);

  // 4. Premium Interactive 3D Cursor Tilt & Floating Packaging Image on Hover
  const handleMouseEnter = (flavour, idx) => {
    pauseAutoScroll();
    setHoveredFlavour(flavour);
    const cardEl = cardRefs.current[idx];
    const imgEl = imgRefs.current[idx];
    const isActive = flavour.id === activeFlavour.id;

    if (cardEl) {
      gsap.to(cardEl, {
        y: isActive ? -12 : -10,
        scale: 1.04,
        boxShadow: `0 20px 36px ${flavour.colors.glow}, ${
          isActive ? `5px 5px 0px ${flavour.colors.dark}` : '0 10px 24px rgba(0,0,0,0.12)'
        }`,
        borderColor: flavour.colors.primary,
        transformPerspective: 1200,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }

    if (imgEl) {
      gsap.to(imgEl, {
        scale: 1.08,
        y: -8,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
  };

  const handleMouseMove = (e, idx) => {
    // Subtle cursor-following 3D tilt (desktop only)
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const cardEl = cardRefs.current[idx];
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;

    // Mouse coordinates relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / cardWidth - 0.5;
    const mouseY = (e.clientY - rect.top) / cardHeight - 0.5;

    // Subtle 3D tilt: max ±6deg Y rotation, max ±6deg X rotation
    const rotateY = mouseX * 12;
    const rotateX = -mouseY * 12;

    gsap.to(cardEl, {
      rotationY: rotateY,
      rotationX: rotateX,
      transformPerspective: 1200,
      duration: 0.25,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = (flavour, idx) => {
    setHoveredFlavour(null);
    scheduleAutoScrollResume(2500);

    const cardEl = cardRefs.current[idx];
    const imgEl = imgRefs.current[idx];
    const isActive = flavour.id === activeFlavour.id;

    if (cardEl) {
      gsap.to(cardEl, {
        rotationX: 0,
        rotationY: 0,
        scale: 1.0,
        y: 0,
        boxShadow: isActive
          ? `5px 5px 0px ${flavour.colors.dark}`
          : `0 4px 12px rgba(0,0,0,0.06)`,
        borderColor: flavour.colors.dark,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => {
          updateScroll3DRoll();
        }
      });
    }

    if (imgEl) {
      gsap.to(imgEl, {
        scale: 1.0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
  };

  // Mouse Drag-to-Scroll Handlers for Desktop Pointers
  const handleMouseDown = (e) => {
    pauseAutoScroll();
    isDraggingRef.current = true;
    startXRef.current = e.pageX - sliderTrackRef.current.offsetLeft;
    scrollLeftRef.current = sliderTrackRef.current.scrollLeft;
  };

  const handleMouseDragLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      scheduleAutoScrollResume(2500);
    }
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      scheduleAutoScrollResume(2500);
    }
  };

  const handleMouseMoveDrag = (e) => {
    if (!isDraggingRef.current || !sliderTrackRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderTrackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    sliderTrackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  // Touch Handlers for Mobile Swipe
  const handleTouchStart = () => {
    pauseAutoScroll();
  };

  const handleTouchEnd = () => {
    scheduleAutoScrollResume(2500);
  };

  const handleWheel = () => {
    pauseAutoScroll();
    scheduleAutoScrollResume(2500);
  };

  return (
    <section 
      ref={sectionRef}
      id="flavours" 
      className="py-24 relative z-10 shadow-sm overflow-hidden"
      style={{
        backgroundColor: activeFlavour.colors.background,
        color: activeFlavour.colors.dark
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div 
            ref={sectionBadgeRef}
            className="inline-block px-5 py-2 text-xs font-sheetal font-black uppercase tracking-wider mb-4 shadow-sm border-3 rounded-full text-white"
            style={{
              backgroundColor: activeFlavour.colors.primary,
              borderColor: activeFlavour.colors.dark
            }}
          >
            ✦ Interactive Flavour Journey
          </div>
          <h2 
            ref={headingRef}
            className="font-sheetal font-black text-4xl sm:text-6xl tracking-tight mb-4"
            style={{ color: activeFlavour.colors.dark }}
          >
            Pick Your Favourite Flavour!
          </h2>
          <p 
            ref={subheadingRef}
            className="font-bubble text-xl sm:text-2xl font-bold opacity-90"
            style={{ color: activeFlavour.colors.dark }}
          >
            Glide horizontally to explore all 7 flavours — hover to preview, click to activate!
          </p>
        </div>

        {/* Flavour Cards Auto-Scrolling Carousel Track */}
        <div 
          ref={sliderTrackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseDragLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMoveDrag}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-8 px-4 relative mb-12 max-w-full select-none cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}
        >
          {displayFlavours.map((flavour, idx) => {
            const isActive = flavour.id === activeFlavour.id;

            return (
              <button
                key={`${flavour.id}-${idx}`}
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => onSelectFlavour(flavour)}
                onMouseEnter={() => handleMouseEnter(flavour, idx)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(flavour, idx)}
                className={`sheetal-card flex-shrink-0 w-[210px] sm:w-[220px] h-[330px] sm:h-[340px] relative rounded-3xl p-5 text-left flex flex-col justify-between cursor-pointer overflow-hidden transition-colors duration-300 select-none ${
                  isActive ? 'z-20 border-4' : 'z-10 border-2'
                }`}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: flavour.colors.dark,
                  boxShadow: isActive
                    ? `5px 5px 0px ${flavour.colors.dark}`
                    : `0 4px 12px rgba(0,0,0,0.06)`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between z-20 w-full">
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center font-sheetal font-black text-sm text-white shadow-sm border-2"
                    style={{ 
                      backgroundColor: flavour.colors.primary,
                      borderColor: flavour.colors.dark
                    }}
                  >
                    {flavour.name.charAt(0)}
                  </div>

                  {isActive && (
                    <span 
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center font-black text-xs shadow-md border-2"
                      style={{ 
                        backgroundColor: flavour.colors.primary,
                        borderColor: flavour.colors.dark
                      }}
                      title="Active Flavour"
                    >
                      ✓
                    </span>
                  )}
                </div>

                {/* Packaging Image (Floating & Scaled on Hover) */}
                <div className="flex-1 my-auto py-2 flex items-center justify-center z-10 relative">
                  <img 
                    ref={(el) => (imgRefs.current[idx] = el)}
                    src={flavour.assets.box1l} 
                    alt={flavour.name} 
                    className="h-40 sm:h-44 w-full object-contain filter drop-shadow-xl select-none pointer-events-none"
                    style={{ willChange: 'transform' }}
                  />
                </div>

                {/* Flavour Title */}
                <div className="z-20 pt-1">
                  <h3 
                    className="font-sheetal font-black text-lg tracking-tight leading-tight"
                    style={{ color: flavour.colors.dark }}
                  >
                    {flavour.name}
                  </h3>
                  <span 
                    className="text-xs font-bubble font-bold block truncate mt-0.5 opacity-80"
                    style={{ color: flavour.colors.dark }}
                  >
                    {flavour.sensoryNotes[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Active Flavour Spotlight Card */}
        <div
          className="bg-white p-6 sm:p-8 text-left border-3 relative overflow-hidden shadow-md rounded-3xl"
          style={{ borderColor: activeFlavour.colors.dark }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Spotlight Product Image */}
            <div className="md:col-span-3 flex justify-center items-center relative py-2">
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-500"
                style={{ backgroundColor: activeFlavour.colors.primary }}
              />
              <img 
                src={activeFlavour.assets.box1l}
                alt={activeFlavour.name}
                className="h-44 sm:h-52 object-contain relative z-10 filter drop-shadow-2xl select-none"
              />
            </div>

            {/* Spotlight Details */}
            <div className="md:col-span-6">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span 
                  className="px-3.5 py-1 rounded-full text-xs font-sheetal font-black uppercase text-white border shadow-sm transition-colors duration-500"
                  style={{ 
                    backgroundColor: activeFlavour.colors.primary,
                    borderColor: activeFlavour.colors.dark
                  }}
                >
                  Active Flavour Spotlight
                </span>
                <span 
                  className="text-xs font-bubble font-bold flex items-center gap-1 transition-colors duration-500"
                  style={{ color: activeFlavour.colors.dark }}
                >
                  <Flame className="w-4 h-4" style={{ color: activeFlavour.colors.primary }} />
                  Sensory Taste Profile
                </span>
              </div>
              <h3 
                className="font-sheetal font-black text-2xl sm:text-4xl mb-2 transition-colors duration-500"
                style={{ color: activeFlavour.colors.dark }}
              >
                Just Minute {activeFlavour.name} — {activeFlavour.tagline}
              </h3>
              <p 
                className="font-semibold text-sm sm:text-base leading-relaxed opacity-90 transition-colors duration-500"
                style={{ color: activeFlavour.colors.dark }}
              >
                {activeFlavour.description}
              </p>
            </div>

            {/* Key Taste Notes */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <span 
                className="text-xs uppercase font-sheetal font-black tracking-wider transition-colors duration-500"
                style={{ color: activeFlavour.colors.dark }}
              >
                Key Taste Notes:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeFlavour.sensoryNotes.map((note, idx) => (
                  <span 
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-sheetal font-bold bg-white border-2 shadow-sm transition-colors duration-500"
                    style={{ 
                      color: activeFlavour.colors.dark,
                      borderColor: activeFlavour.colors.dark
                    }}
                  >
                    ★ {note}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}





