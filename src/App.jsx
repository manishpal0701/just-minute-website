import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { FLAVOURS } from './data/flavoursData';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import SheetalHeader from './components/SheetalHeader';
import SheetalHero from './components/SheetalHero';
import PinnedFlavourSection from './components/PinnedFlavourSection';
import SheetalDoodlePath from './components/SheetalDoodlePath';
import SheetalFlavourSelector from './components/SheetalFlavourSelector';
import SheetalProductShowcase from './components/SheetalProductShowcase';
import PrepSteps from './components/PrepSteps';
import MixologyStudio from './components/MixologyStudio';
import VerifiedBadges from './components/VerifiedBadges';
import SheetalStats from './components/SheetalStats';
import SheetalFooter from './components/SheetalFooter';
import StoreLocatorModal from './components/StoreLocatorModal';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [activeFlavour, setActiveFlavour] = useState(FLAVOURS[0]); // Default Mango
  const [retailerModalOpen, setRetailerModalOpen] = useState(false);

  // Initialize GSAP ScrollTrigger + Lenis smooth scroll synchronization
  useLenisSmoothScroll();

  // Smoothly morph root CSS color variables using GSAP on active flavour change
  useEffect(() => {
    if (!activeFlavour || !activeFlavour.colors) return;
    const { colors } = activeFlavour;

    gsap.to(':root', {
      '--theme-bg': colors.background,
      '--theme-bg-subtle': colors.backgroundSubtle,
      '--theme-primary': colors.primary,
      '--theme-secondary': colors.secondary,
      '--theme-accent': colors.accent,
      '--theme-dark': colors.dark,
      '--theme-text-dark': colors.textDark,
      '--theme-glow': colors.glow,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, [activeFlavour]);

  const handleSelectFlavour = (flavour) => {
    setActiveFlavour(flavour);
  };

  return (
    <div className="theme-container relative min-h-screen overflow-x-hidden font-sans">
      {/* Brand Juice-Experience Loading Screen */}
      <LoadingScreen activeFlavour={activeFlavour} />

      {/* Sheetal Style Header with GSAP Magnetic Menu & Backdrop Scroll */}
      <SheetalHeader 
        activeFlavour={activeFlavour} 
        onOpenRetailerModal={() => setRetailerModalOpen(true)} 
      />

      <main className="relative z-10">
        {/* GSAP Entrance Timeline & Hero Parallax Scrub */}
        <SheetalHero 
          activeFlavour={activeFlavour}
          flavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenRetailerModal={() => setRetailerModalOpen(true)}
        />

        {/* Signature Pinned Scroll Flavour Storytelling (7 Flavours Morphing Experience) */}
        <div id="pinned-flavours">
          <PinnedFlavourSection 
            flavours={FLAVOURS}
            activeFlavour={activeFlavour}
            onSelectFlavour={handleSelectFlavour}
            onOpenRetailerModal={() => setRetailerModalOpen(true)}
          />
        </div>

        {/* Curved Doodle Path Divider */}
        <SheetalDoodlePath activeFlavour={activeFlavour} />

        {/* Flavour Spectrum & Interactive Selector Grid */}
        <SheetalFlavourSelector 
          activeFlavour={activeFlavour}
          flavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
        />

        {/* Product Category Showcase with 3D Tilt & GSAP Scroll Scrub */}
        <SheetalProductShowcase 
          activeFlavour={activeFlavour}
          onOpenRetailerModal={() => setRetailerModalOpen(true)}
        />

        {/* 1-Minute Prep Steps with GSAP Progress Scroll */}
        <PrepSteps 
          activeFlavour={activeFlavour}
        />

        {/* Mixology Studio */}
        <MixologyStudio 
          activeFlavour={activeFlavour}
        />

        {/* Verified Packaging Badges */}
        <VerifiedBadges 
          activeFlavour={activeFlavour}
        />

        {/* Brand Stats & Heritage */}
        <SheetalStats activeFlavour={activeFlavour} />
      </main>

      {/* Footer & Floating Scroll-to-Top Button */}
      <SheetalFooter 
        activeFlavour={activeFlavour}
        flavours={FLAVOURS}
        onSelectFlavour={handleSelectFlavour}
      />

      {/* Retailer Inquiry Modal */}
      <StoreLocatorModal 
        isOpen={retailerModalOpen}
        onClose={() => setRetailerModalOpen(false)}
        activeFlavour={activeFlavour}
      />

    </div>
  );
}
