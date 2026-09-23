import React, { useRef } from 'react';
import { ShieldCheck, Award, Zap, CheckCircle2, FileCheck } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { initVerifiedBadgesScroll } from '../animations/verifiedBadgesAnimations';

export default function VerifiedBadges({ activeFlavour }) {
  const scopeRef = useRef(null);

  useGSAP(() => {
    initVerifiedBadgesScroll(scopeRef);
  }, { scope: scopeRef, dependencies: [activeFlavour.id] });

  const highlights = [
    {
      title: 'Sugar Free Formula',
      desc: 'Formulated to deliver rich sweetness without sugar added on top of the base blend.',
      icon: Award,
      badge: 'Packaging Badge'
    },
    {
      title: 'No Saccharin',
      desc: 'Clean formulation verified on packaging front seal.',
      icon: ShieldCheck,
      badge: 'Verified Quality'
    },
    {
      title: 'Vitamin C Enriched',
      desc: 'Contains Vitamin C RDA contribution per serve for daily citrus energy.',
      icon: Zap,
      badge: 'Fortified'
    },
    {
      title: 'Instant Dissolve',
      desc: 'Dissolves instantly in cold water without stirring residue.',
      icon: CheckCircle2,
      badge: '60 Sec Prep'
    },
    {
      title: 'FSSAI License Verified',
      desc: 'FSSAI License No. 1152307300232 printed on official side panel.',
      icon: FileCheck,
      badge: 'Lic. 1152307300232'
    }
  ];

  return (
    <section 
      ref={scopeRef} 
      id="verified" 
      className="py-24 relative z-10 shadow-sm overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: activeFlavour.colors.background,
        color: activeFlavour.colors.dark
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="gsap-verified-header text-center max-w-3xl mx-auto mb-16">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 text-xs font-sheetal font-black uppercase tracking-wider mb-4 shadow-sm"
            style={{ color: activeFlavour.colors.dark, borderColor: activeFlavour.colors.dark }}
          >
            <ShieldCheck className="w-4 h-4" style={{ color: activeFlavour.colors.secondary }} />
            <span>Verified Packaging Badges</span>
          </div>
          <h2 
            className="font-sheetal font-black text-4xl sm:text-5xl tracking-tight mb-4"
            style={{ color: activeFlavour.colors.dark }}
          >
            Quality Standard Guaranteed
          </h2>
          <p className="font-semibold text-base sm:text-lg opacity-90" style={{ color: activeFlavour.colors.dark }}>
            Details and seals printed directly on authentic Just Minute packaging boxes and sachets.
          </p>
        </div>

        {/* Highlights Cards */}
        <div className="gsap-verified-card-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="gsap-verified-card interactive-card bg-white p-6 rounded-3xl border-2 text-left flex flex-col justify-between shadow-md transition-all"
                style={{ borderColor: activeFlavour.colors.dark }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl border-2 text-white flex items-center justify-center shadow-sm"
                      style={{ 
                        backgroundColor: activeFlavour.colors.primary,
                        borderColor: activeFlavour.colors.dark
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span 
                      className="text-[10px] uppercase font-sheetal font-black tracking-wider px-2 py-1 rounded border"
                      style={{ 
                        backgroundColor: activeFlavour.colors.background,
                        color: activeFlavour.colors.dark,
                        borderColor: `${activeFlavour.colors.dark}30`
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-sheetal font-black text-lg mb-2" style={{ color: activeFlavour.colors.dark }}>
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed opacity-80" style={{ color: activeFlavour.colors.dark }}>
                    {item.desc}
                  </p>
                </div>

                <div 
                  className="mt-6 pt-3 border-t-2 flex items-center gap-1.5 text-[11px] font-sheetal font-black"
                  style={{ 
                    borderColor: `${activeFlavour.colors.dark}20`,
                    color: activeFlavour.colors.secondary
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified on Packaging
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
