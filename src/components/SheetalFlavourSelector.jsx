import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';

export default function SheetalFlavourSelector({ activeFlavour, flavours, onSelectFlavour }) {
  return (
    <section 
      id="flavours" 
      className="py-24 relative z-10 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: activeFlavour.colors.background,
        color: activeFlavour.colors.dark
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className="inline-block px-5 py-2 text-xs font-sheetal font-black uppercase tracking-wider mb-4 shadow-sm border-3 rounded-full text-white"
            style={{
              backgroundColor: activeFlavour.colors.primary,
              borderColor: activeFlavour.colors.dark
            }}
          >
            ✦ Interactive Flavour Journey
          </div>
          <h2 
            className="font-sheetal font-black text-4xl sm:text-6xl tracking-tight mb-4"
            style={{ color: activeFlavour.colors.dark }}
          >
            Pick Your Favourite Flavour!
          </h2>
          <p 
            className="font-bubble text-xl sm:text-2xl font-bold opacity-90"
            style={{ color: activeFlavour.colors.dark }}
          >
            Tap any box below to explode the website into that flavour's vibrant atmosphere.
          </p>
        </div>

        {/* 7 Flavour Pop-Art Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-6">
          {flavours.map((flavour, idx) => {
            const isActive = flavour.id === activeFlavour.id;
            return (
              <motion.button
                key={flavour.id}
                onClick={() => onSelectFlavour(flavour)}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1.5 : -1.5 }}
                whileTap={{ scale: 0.96 }}
                className={`sheetal-card relative rounded-3xl p-5 text-left flex flex-col justify-between h-60 cursor-pointer overflow-hidden transition-all duration-300 ${
                  isActive
                    ? 'scale-105 z-20 shadow-lg border-4'
                    : 'hover:scale-103 opacity-100 border-2'
                }`}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: flavour.colors.dark,
                  boxShadow: isActive
                    ? `5px 5px 0px ${flavour.colors.dark}`
                    : `0 4px 12px rgba(0,0,0,0.06)`
                }}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center font-sheetal font-black text-xs text-white shadow-sm border"
                    style={{ 
                      backgroundColor: flavour.colors.primary,
                      borderColor: flavour.colors.dark
                    }}
                  >
                    {flavour.name.charAt(0)}
                  </div>

                  {isActive && (
                    <span 
                      className="w-6 h-6 rounded-full text-white flex items-center justify-center font-black text-xs shadow-md border"
                      style={{ 
                        backgroundColor: flavour.colors.primary,
                        borderColor: flavour.colors.dark
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>

                {/* Packaging Miniature */}
                <div className="my-auto py-2 flex justify-center z-10">
                  <img 
                    src={flavour.assets.box1l} 
                    alt={flavour.name} 
                    className="h-28 object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Flavour Title */}
                <div className="z-10">
                  <h3 
                    className="font-sheetal font-black text-base tracking-tight leading-tight"
                    style={{ color: flavour.colors.dark }}
                  >
                    {flavour.name}
                  </h3>
                  <span 
                    className="text-[10px] font-bubble font-bold block truncate mt-0.5 opacity-80"
                    style={{ color: flavour.colors.dark }}
                  >
                    {flavour.sensoryNotes[0]}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Active Flavour Spotlight */}
        <motion.div
          key={activeFlavour.id + '-spotlight'}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 bg-white p-8 text-left border-3 relative overflow-hidden shadow-md rounded-3xl"
          style={{ borderColor: activeFlavour.colors.dark }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-2">
                <span 
                  className="px-3.5 py-1 rounded-full text-xs font-sheetal font-black uppercase text-white border shadow-sm"
                  style={{ 
                    backgroundColor: activeFlavour.colors.primary,
                    borderColor: activeFlavour.colors.dark
                  }}
                >
                  Active Flavour Spotlight
                </span>
                <span 
                  className="text-xs font-bubble font-bold flex items-center gap-1"
                  style={{ color: activeFlavour.colors.dark }}
                >
                  <Flame className="w-4 h-4" style={{ color: activeFlavour.colors.primary }} />
                  Sensory Taste Profile
                </span>
              </div>
              <h3 
                className="font-sheetal font-black text-3xl sm:text-4xl mb-2"
                style={{ color: activeFlavour.colors.dark }}
              >
                Just Minute {activeFlavour.name} — {activeFlavour.tagline}
              </h3>
              <p 
                className="font-semibold text-base leading-relaxed opacity-90"
                style={{ color: activeFlavour.colors.dark }}
              >
                {activeFlavour.description}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2">
              <span 
                className="text-xs uppercase font-sheetal font-black tracking-wider"
                style={{ color: activeFlavour.colors.dark }}
              >
                Key Taste Notes:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeFlavour.sensoryNotes.map((note, idx) => (
                  <span 
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-sheetal font-bold bg-white border-2 shadow-sm"
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
        </motion.div>

      </div>
    </section>
  );
}
