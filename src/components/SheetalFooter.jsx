import React, { useRef } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SheetalFooter({ activeFlavour, flavours, onSelectFlavour }) {
  const footerRef = useRef(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      '.gsap-footer-col',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryColor = activeFlavour?.colors?.primary || 'var(--theme-primary)';
  const darkColor = activeFlavour?.colors?.dark || 'var(--theme-dark)';
  const bgColor = activeFlavour?.colors?.background || 'var(--theme-bg)';

  return (
    <>
      <footer 
        ref={footerRef} 
        className="relative z-10 pt-16 pb-12 border-t-4 transition-colors duration-500 shadow-sm"
        style={{
          backgroundColor: bgColor,
          borderColor: darkColor,
          color: darkColor
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            
            {/* Brand Logo & Tagline */}
            <div className="gsap-footer-col md:col-span-5 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-sheetal font-black text-white text-2xl shadow-md border-2"
                  style={{
                    backgroundColor: primaryColor,
                    borderColor: darkColor
                  }}
                >
                  JM
                </div>
                <div>
                  <span className="font-sheetal font-black text-3xl tracking-tight block leading-none" style={{ color: darkColor }}>
                    JUST MINUTE
                  </span>
                  <span className="font-bubble text-xs block tracking-wider font-bold" style={{ color: primaryColor }}>
                    Instant Flavour Magic
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed max-w-sm mb-4 opacity-90" style={{ color: darkColor }}>
                Gourmet fruit drink experience. Prepare 1 Litre or 5 Litres of refreshing fruit drink in under 60 seconds.
              </p>
              <div className="text-xs font-bold opacity-80" style={{ color: darkColor }}>
                FSSAI Lic. No. 1152307300232 • Sugar Free • Vitamin C Enriched
              </div>
            </div>

            {/* Flavours Column */}
            <div className="gsap-footer-col md:col-span-4 text-left">
              <h4 className="font-sheetal font-black text-lg uppercase tracking-wider mb-4 flex items-center gap-1.5" style={{ color: darkColor }}>
                <Sparkles className="w-4 h-4" style={{ color: primaryColor }} />
                Flavour Spectrum
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-sheetal font-bold">
                {flavours.map((fl) => (
                  <button
                    key={fl.id}
                    onClick={() => onSelectFlavour(fl)}
                    className="text-left transition-colors py-1 flex items-center gap-2 cursor-pointer hover:opacity-100 opacity-80"
                    style={{ color: darkColor }}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: fl.colors.primary }}
                    />
                    <span>{fl.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pack Sizes Column */}
            <div className="gsap-footer-col md:col-span-3 text-left">
              <h4 className="font-sheetal font-black text-lg uppercase tracking-wider mb-4" style={{ color: darkColor }}>
                Pack Formats
              </h4>
              <ul className="space-y-2 text-xs font-sheetal font-semibold opacity-90" style={{ color: darkColor }}>
                <li>• 1 Litre Box (@ ₹15/-)</li>
                <li>• 5 Litre Party Pack (@ ₹70/-)</li>
                <li>• Instant Powder Sachet</li>
                <li>• Bulk Retailer Supply</li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div 
            className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-medium gap-4"
            style={{ borderColor: `${darkColor}20`, color: darkColor }}
          >
            <div>
              © {new Date().getFullYear()} Just Minute™. All Rights Reserved.
            </div>
            <div className="font-bubble font-bold text-sm" style={{ color: primaryColor }}>
              Made of 100% Pure Fruit Flavour Love
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Scroll-to-Top Circle Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center font-sheetal font-black text-xl text-white cursor-pointer shadow-xl hover:scale-110 transition-transform border-2"
        style={{
          backgroundColor: primaryColor,
          borderColor: darkColor
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 stroke-[3]" />
      </button>
    </>
  );
}
