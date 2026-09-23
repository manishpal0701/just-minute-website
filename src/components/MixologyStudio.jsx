import React, { useRef } from 'react';
import { Wine, Clock, Sparkles, Check } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { initMixologyHeroTimeline, initMixologyPinnedRecipeScroll } from '../animations/mixologyAnimations';

export default function MixologyStudio({ activeFlavour }) {
  const scopeRef = useRef(null);
  const recipe = activeFlavour.recipe;

  useGSAP(() => {
    initMixologyHeroTimeline(scopeRef);
    initMixologyPinnedRecipeScroll(scopeRef);
  }, { scope: scopeRef, dependencies: [activeFlavour.id] });

  return (
    <section 
      ref={scopeRef} 
      id="mixology" 
      className="py-24 relative z-10 shadow-sm overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: activeFlavour.colors.background,
        color: activeFlavour.colors.dark
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Recipe Details */}
          <div className="lg:col-span-6 text-left">
            
            {/* Badge */}
            <div 
              className="gsap-mixology-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 text-xs font-black uppercase tracking-wider mb-4 shadow-sm"
              style={{ color: activeFlavour.colors.dark, borderColor: activeFlavour.colors.dark }}
            >
              <Wine className="w-3.5 h-3.5" style={{ color: activeFlavour.colors.primary }} />
              <span>Gourmet Mixology Studio</span>
            </div>

            {/* Split-Line Heading Reveal */}
            <div key={activeFlavour.id + '-mix-heading'} className="mb-4">
              <h2 
                className="font-sheetal font-black text-4xl sm:text-5xl tracking-tight leading-tight"
                style={{ color: activeFlavour.colors.dark }}
              >
                <span className="gsap-mixology-heading-line block">Craft Gourmet Drinks with</span>
                <span className="gsap-mixology-heading-line block font-bubble" style={{ color: activeFlavour.colors.primary }}>
                  {activeFlavour.name}
                </span>
              </h2>
            </div>

            <p 
              className="gsap-mixology-desc font-semibold text-base sm:text-lg mb-8 opacity-90"
              style={{ color: activeFlavour.colors.dark }}
            >
              Transform your daily refreshment into an artisan mocktail or popsicle using Just Minute instant mix.
            </p>

            {/* Active Recipe Card */}
            <div 
              className="gsap-mixology-card bg-white p-8 rounded-3xl border-3 relative shadow-md"
              style={{ borderColor: activeFlavour.colors.dark, color: activeFlavour.colors.dark }}
            >
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="px-3.5 py-1 rounded-full text-xs font-sheetal font-black uppercase text-white border shadow-sm"
                  style={{ 
                    backgroundColor: activeFlavour.colors.primary,
                    borderColor: activeFlavour.colors.dark
                  }}
                >
                  Featured Flavour Creation
                </span>
                <span className="text-xs font-bold opacity-80 flex items-center gap-1" style={{ color: activeFlavour.colors.dark }}>
                  <Clock className="w-3.5 h-3.5" style={{ color: activeFlavour.colors.primary }} />
                  Prep: {recipe.prepTime}
                </span>
              </div>

              <h3 
                className="font-sheetal font-black text-2xl sm:text-3xl mb-4"
                style={{ color: activeFlavour.colors.dark }}
              >
                {recipe.title}
              </h3>

              {/* Ingredients List */}
              <div className="mb-6">
                <h4 
                  className="text-xs uppercase font-sheetal font-black tracking-wider mb-3 flex items-center gap-1.5 opacity-80"
                  style={{ color: activeFlavour.colors.dark }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: activeFlavour.colors.primary }} />
                  Ingredients Needed:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipe.ingredients.map((ing, idx) => (
                    <div 
                      key={idx} 
                      className="gsap-ingredient-item flex items-center gap-2 text-xs font-sheetal font-bold px-3.5 py-2.5 rounded-xl border shadow-sm"
                      style={{ 
                        backgroundColor: activeFlavour.colors.background,
                        color: activeFlavour.colors.dark,
                        borderColor: `${activeFlavour.colors.dark}30`
                      }}
                    >
                      <Check className="w-3.5 h-3.5 shrink-0" style={{ color: activeFlavour.colors.secondary }} />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div 
                className="pt-4 border-t-2"
                style={{ borderColor: `${activeFlavour.colors.dark}20` }}
              >
                <h4 
                  className="text-xs uppercase font-sheetal font-black tracking-wider mb-2 opacity-80"
                  style={{ color: activeFlavour.colors.dark }}
                >
                  Quick Master Method:
                </h4>
                <p 
                  className="text-sm font-semibold leading-relaxed opacity-90"
                  style={{ color: activeFlavour.colors.dark }}
                >
                  {recipe.instructions}
                </p>
              </div>

            </div>

          </div>

          {/* Right Promo Showcase Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div 
              className="gsap-mixology-promo relative w-full max-w-lg rounded-3xl overflow-hidden bg-white p-4 border-3 shadow-md"
              style={{ borderColor: activeFlavour.colors.dark }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2" style={{ borderColor: `${activeFlavour.colors.dark}20` }}>
                <img 
                  src="/assets/promo/promo-1.jpg" 
                  alt="Just Minute Recipe Showcase" 
                  className="gsap-mixology-promo-img w-full h-full object-cover filter contrast-105"
                />
                
                <div 
                  className="absolute inset-x-0 bottom-0 p-4 border-t-2 text-white"
                  style={{ 
                    backgroundColor: activeFlavour.colors.dark,
                    borderColor: activeFlavour.colors.dark
                  }}
                >
                  <div 
                    className="text-xs uppercase font-bold tracking-widest mb-1"
                    style={{ color: activeFlavour.colors.accent }}
                  >
                    Instant Gourmet Experience
                  </div>
                  <div className="text-sm font-bold text-white">
                    Every pack is formulated for instant dissolution & peak fruit flavor.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
