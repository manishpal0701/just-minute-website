import React from 'react';
import { motion } from 'framer-motion';

export default function SheetalDoodlePath({ activeFlavour }) {
  const primaryColor = activeFlavour?.colors?.primary || 'var(--theme-primary)';
  const darkColor = activeFlavour?.colors?.dark || 'var(--theme-dark)';
  const secondaryColor = activeFlavour?.colors?.secondary || 'var(--theme-secondary)';

  return (
    <div 
      className="relative z-20 py-12 overflow-hidden shadow-sm transition-colors duration-500"
      style={{ backgroundColor: activeFlavour?.colors?.background || 'var(--theme-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-6 text-center">
          
          <motion.div 
            whileHover={{ scale: 1.08, rotate: -2 }}
            className="px-6 py-4 max-w-xs cursor-pointer shadow-md rounded-2xl border-3 bg-white"
            style={{ borderColor: darkColor }}
          >
            <div className="font-bubble text-lg" style={{ color: primaryColor }}>🍊 Richness & Purity</div>
            <div className="font-sheetal font-extrabold text-sm" style={{ color: darkColor }}>Made of 100% pure fruit flavour extracts</div>
          </motion.div>

          <svg className="w-24 h-16 hidden md:block" viewBox="0 0 100 60" fill="none" stroke={primaryColor} strokeWidth="4" strokeLinecap="round">
            <path d="M10,10 Q50,50 90,20" />
            <path d="M75,10 L90,20 L80,35" fill="none" />
          </svg>

          <motion.div 
            whileHover={{ scale: 1.08, rotate: 2 }}
            className="px-6 py-4 max-w-xs cursor-pointer rounded-2xl border-3 shadow-md text-white"
            style={{ backgroundColor: primaryColor, borderColor: darkColor }}
          >
            <div className="font-bubble text-lg text-white">🥭 Instant Refreshment</div>
            <div className="font-sheetal font-extrabold text-sm text-white">60 Seconds from Pack to Pitcher</div>
          </motion.div>

          <svg className="w-24 h-16 hidden md:block" viewBox="0 0 100 60" fill="none" stroke={primaryColor} strokeWidth="4" strokeLinecap="round">
            <path d="M10,40 Q50,0 90,30" />
            <path d="M75,35 L90,30 L85,15" fill="none" />
          </svg>

          <motion.div 
            whileHover={{ scale: 1.08, rotate: -2 }}
            className="px-6 py-4 max-w-xs cursor-pointer shadow-md rounded-2xl border-3 bg-white"
            style={{ borderColor: darkColor }}
          >
            <div className="font-bubble text-lg" style={{ color: secondaryColor }}>🎉 Party Pack Sizes</div>
            <div className="font-sheetal font-extrabold text-sm" style={{ color: darkColor }}>5 Litres for Celebrations @ ₹70</div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
