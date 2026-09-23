import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MapPin } from 'lucide-react';
import { initMagneticButton } from '../utils/gsapUtils';

export default function SheetalHeader({ activeFlavour, onOpenRetailerModal }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuBtnRef = useRef(null);
  const retailerBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize GSAP Magnetic Button Pull
  useEffect(() => {
    const cleanupMenu = initMagneticButton(menuBtnRef.current, 0.35);
    const cleanupRetailer = initMagneticButton(retailerBtnRef.current, 0.35);
    return () => {
      if (cleanupMenu) cleanupMenu();
      if (cleanupRetailer) cleanupRetailer();
    };
  }, []);

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Pinned Flavour Journey', href: '#pinned-flavours' },
    { label: 'Flavour Spectrum', href: '#flavours' },
    { label: 'Pack Formats (1L / 5L)', href: '#range' },
    { label: '1-Min Prep Guide', href: '#prep' },
    { label: 'Gourmet Mixology Studio', href: '#mixology' },
    { label: 'Verified Packaging Badges', href: '#verified' }
  ];

  return (
    <>
      <header
        className={`gsap-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 backdrop-blur-xl shadow-md border-b-2'
            : 'py-5 bg-transparent'
        }`}
        style={{
          backgroundColor: scrolled ? activeFlavour.colors.background : 'transparent',
          borderColor: scrolled ? `${activeFlavour.colors.dark}20` : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Left Wavy Hamburger Icon Menu Button with GSAP Magnetic Tracking */}
          <button
            ref={menuBtnRef}
            onClick={() => setDrawerOpen(true)}
            className="magnetic-btn flex items-center gap-2 group cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <div 
              className="w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center gap-1 transition-transform group-hover:scale-110 border-2 shadow-md"
              style={{ borderColor: activeFlavour.colors.dark }}
            >
              <span 
                className="w-6 h-1 rounded-full transition-all group-hover:w-7" 
                style={{ backgroundColor: activeFlavour.colors.primary }}
              />
              <span 
                className="w-5 h-1 rounded-full transition-all group-hover:w-7" 
                style={{ backgroundColor: activeFlavour.colors.dark }}
              />
              <span 
                className="w-6 h-1 rounded-full transition-all group-hover:w-7" 
                style={{ backgroundColor: activeFlavour.colors.primary }}
              />
            </div>
            <span 
              className="hidden sm:inline font-sheetal font-black text-xs uppercase tracking-widest"
              style={{ color: activeFlavour.colors.dark }}
            >
              Menu
            </span>
          </button>

          {/* Right Brand Identity Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="text-right">
              <span 
                className="font-sheetal font-black text-3xl sm:text-4xl tracking-tight block leading-none"
                style={{ color: activeFlavour.colors.dark }}
              >
                JUST MINUTE
              </span>
              <span 
                className="font-bubble text-xs sm:text-sm block tracking-wider font-bold"
                style={{ color: activeFlavour.colors.primary }}
              >
                Instant Flavour Magic
              </span>
            </div>
            <div 
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-sheetal font-black text-white text-xl shadow-md transition-transform group-hover:rotate-12 border-2"
              style={{
                backgroundColor: activeFlavour.colors.primary,
                borderColor: activeFlavour.colors.dark
              }}
            >
              JM
            </div>
          </a>

        </div>
      </header>

      {/* Full-Screen Sheetal Navigation Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
            style={{ backgroundColor: `${activeFlavour.colors.background}FA`, color: activeFlavour.colors.dark }}
          >
            {/* Drawer Top Header */}
            <div 
              className="flex items-center justify-between border-b-2 pb-6"
              style={{ borderColor: `${activeFlavour.colors.dark}20` }}
            >
              <div className="flex items-center gap-2 font-bubble text-xl font-bold" style={{ color: activeFlavour.colors.dark }}>
                <Sparkles className="w-5 h-5 animate-spin" style={{ color: activeFlavour.colors.primary }} />
                <span>Explore Just Minute Experience</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-3 rounded-full bg-white border-2 transition-transform hover:rotate-90 cursor-pointer shadow-md"
                style={{ color: activeFlavour.colors.dark, borderColor: activeFlavour.colors.dark }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links List */}
            <div className="my-auto py-8 space-y-4 max-w-2xl mx-auto w-full text-center">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="block font-sheetal font-black text-3xl sm:text-5xl transition-colors py-2"
                  style={{ color: activeFlavour.colors.dark }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Drawer Bottom CTA */}
            <div 
              className="pt-6 border-t-2 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto w-full"
              style={{ borderColor: `${activeFlavour.colors.dark}20` }}
            >
              <div className="text-xs font-semibold opacity-80" style={{ color: activeFlavour.colors.dark }}>
                1 Litre Box @ ₹15/- • 5 Litre Party Pack @ ₹70/- • FSSAI Certified
              </div>
              <button
                ref={retailerBtnRef}
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenRetailerModal();
                }}
                className="magnetic-btn px-8 py-3.5 rounded-full font-sheetal font-black text-sm text-white transition-transform hover:scale-105 shadow-md flex items-center gap-2 cursor-pointer border-2"
                style={{
                  backgroundColor: activeFlavour.colors.primary,
                  borderColor: activeFlavour.colors.dark
                }}
              >
                <MapPin className="w-4 h-4" />
                Find Retailers & Inquire
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
