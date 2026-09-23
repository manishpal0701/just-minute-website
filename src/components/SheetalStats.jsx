import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { initBrandStatsScroll } from '../animations/brandStatsAnimations';

export default function SheetalStats({ activeFlavour }) {
  const scopeRef = useRef(null);

  useGSAP(() => {
    initBrandStatsScroll(scopeRef);
  }, { scope: scopeRef });

  const stats = [
    { label: 'Retail Reach', value: '28,000+', desc: 'Authorized Retail Outlets' },
    { label: 'Pan India Presence', value: '160+ Cities', desc: 'Widespread Distribution' },
    { label: 'Instant Prep', value: '60 Seconds', desc: 'No hassle preparation' },
    { label: 'Quality Guarantee', value: 'FSSAI Certified', desc: 'Lic. 1152307300232' }
  ];

  const primaryColor = activeFlavour?.colors?.primary || 'var(--theme-primary)';
  const darkColor = activeFlavour?.colors?.dark || 'var(--theme-dark)';
  const bgColor = activeFlavour?.colors?.background || 'var(--theme-bg)';

  return (
    <section 
      ref={scopeRef} 
      className="py-20 relative z-10 shadow-sm overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: bgColor,
        color: darkColor
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Banner Section */}
        <div 
          className="gsap-stats-banner bg-white p-8 sm:p-12 border-3 rounded-3xl shadow-md relative overflow-hidden mb-12"
          style={{ borderColor: darkColor, color: darkColor }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 text-left">
              <span 
                className="px-4 py-1 text-xs font-sheetal font-black uppercase inline-block mb-3 rounded-full text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                ✦ Pure Taste & Quality
              </span>
              <h2 className="font-sheetal font-black text-3xl sm:text-5xl leading-tight mb-2" style={{ color: darkColor }}>
                Spread Joy with Every Pitcher!
              </h2>
              <p className="font-bubble text-xl sm:text-2xl opacity-90" style={{ color: darkColor }}>
                Crafted with 100% pure fruit flavour extracts, Fortified with Vitamin C, Sugar Free & No Saccharin.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div 
                className="bg-white p-6 text-center border-2 rounded-2xl shadow-md"
                style={{ borderColor: darkColor }}
              >
                <div className="font-bubble text-lg font-bold" style={{ color: primaryColor }}>Loved Across India</div>
                <div className="font-sheetal font-black text-3xl" style={{ color: darkColor }}>100% Delight</div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="gsap-stats-card-grid grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="gsap-stats-card sheetal-card bg-white p-6 text-center border-2 rounded-2xl shadow-md transition-all"
              style={{ borderColor: darkColor }}
            >
              <div className="font-sheetal font-black text-3xl sm:text-4xl mb-1" style={{ color: primaryColor }}>
                {st.value}
              </div>
              <div className="font-sheetal font-bold text-sm mb-1" style={{ color: darkColor }}>
                {st.label}
              </div>
              <div className="font-bubble text-xs opacity-75" style={{ color: darkColor }}>
                {st.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
