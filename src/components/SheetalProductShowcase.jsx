import React, { useState, useRef } from 'react';
import { Package, Users, Zap, MapPin, ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { initProductClipPathReveal, bindGSAP3DTilt } from '../animations/productAnimations';
import { animateMaskedHeading } from '../animations/textAnimations';

export default function SheetalProductShowcase({ activeFlavour, onOpenRetailerModal }) {
  const [selectedFormat, setSelectedFormat] = useState('box1l');
  const scopeRef = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useGSAP(() => {
    initProductClipPathReveal(scopeRef, '.gsap-clip-reveal');
    animateMaskedHeading(scopeRef, '.gsap-masked-heading');

    const c1 = bindGSAP3DTilt(card1Ref.current);
    const c2 = bindGSAP3DTilt(card2Ref.current);
    const c3 = bindGSAP3DTilt(card3Ref.current);

    return () => {
      if (c1) c1();
      if (c2) c2();
      if (c3) c3();
    };
  }, { scope: scopeRef, dependencies: [activeFlavour.id] });

  const categories = [
    {
      id: 'box1l',
      ref: card1Ref,
      cardClass: 'gsap-product-party-card',
      imgClass: 'gsap-product-1l-img',
      title: '1 Litre Family Pack',
      price: activeFlavour.verifiedSpecs.price1L,
      subtitle: 'Daily Family Refreshment',
      icon: Package,
      image: activeFlavour.assets.box1l,
      badge: 'Popular Family Pack'
    },
    {
      id: 'partyPack',
      ref: card2Ref,
      cardClass: 'gsap-product-party-card',
      imgClass: '',
      title: '5 Litre Party Pack',
      price: activeFlavour.verifiedSpecs.price5L,
      subtitle: 'Celebrations & Gatherings',
      icon: Users,
      image: activeFlavour.assets.partyPack,
      badge: 'Value Party Size'
    },
    {
      id: 'sachet',
      ref: card3Ref,
      cardClass: 'gsap-product-sachet-card',
      imgClass: '',
      title: 'Powder Sachet Pack',
      price: 'Convenient Size',
      subtitle: 'On-the-go Single Serving',
      icon: Zap,
      image: activeFlavour.assets.sachet,
      badge: 'Instant Convenience'
    }
  ];

  return (
    <section 
      ref={scopeRef} 
      id="range" 
      className="py-24 relative z-10 shadow-sm overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: activeFlavour.colors.background,
        color: activeFlavour.colors.dark
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className="inline-block px-5 py-2 text-xs font-sheetal font-black uppercase tracking-wider mb-4 shadow-sm border-3 rounded-full text-white"
            style={{
              backgroundColor: activeFlavour.colors.primary,
              borderColor: activeFlavour.colors.dark
            }}
          >
            ⚡ Product Categories Range
          </div>
          <h2 
            className="gsap-masked-heading font-sheetal font-black text-4xl sm:text-6xl tracking-tight mb-4"
            style={{ color: activeFlavour.colors.dark }}
          >
            Delicious Formats for Every Occasion
          </h2>
          <p 
            className="font-bubble text-xl sm:text-2xl font-bold opacity-90"
            style={{ color: activeFlavour.colors.dark }}
          >
            Check out authentic packaging sizes for <span className="font-black underline">{activeFlavour.name}</span>.
          </p>
        </div>

        {/* 3 GSAP 3D Interactive Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                ref={cat.ref}
                onClick={() => setSelectedFormat(cat.id)}
                className={`${cat.cardClass} sheetal-card bg-white p-8 cursor-pointer flex flex-col justify-between h-[460px] relative overflow-hidden shadow-md border-3 rounded-3xl transition-transform duration-300`}
                style={{ borderColor: activeFlavour.colors.dark }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-3.5 py-1 text-xs font-sheetal font-black uppercase shadow-sm border-2 rounded-full text-white"
                      style={{
                        backgroundColor: activeFlavour.colors.primary,
                        borderColor: activeFlavour.colors.dark
                      }}
                    >
                      {cat.badge}
                    </span>
                    <Icon className="w-6 h-6" style={{ color: activeFlavour.colors.dark }} />
                  </div>

                  <h3 
                    className="font-sheetal font-black text-3xl mb-1"
                    style={{ color: activeFlavour.colors.dark }}
                  >
                    {cat.title}
                  </h3>
                  <div 
                    className="font-sheetal font-black text-3xl mb-2"
                    style={{ color: activeFlavour.colors.primary }}
                  >
                    {cat.price}
                  </div>
                  <div 
                    className="font-bubble text-base font-bold opacity-80"
                    style={{ color: activeFlavour.colors.dark }}
                  >
                    {cat.subtitle}
                  </div>
                </div>

                {/* Floating Product Image with Clip-Path Reveal */}
                <div className="relative z-10 my-auto flex justify-center py-4">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className={`${cat.imgClass} gsap-clip-reveal h-44 object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.12)]`}
                  />
                </div>

                <div 
                  className="relative z-10 pt-4 border-t-2 flex items-center justify-between text-xs font-sheetal font-black"
                  style={{ borderColor: `${activeFlavour.colors.dark}20`, color: activeFlavour.colors.dark }}
                >
                  <span>Authentic Packaging • Instant Mix</span>
                  <span className="underline font-bubble text-lg" style={{ color: activeFlavour.colors.primary }}>Select Format →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={onOpenRetailerModal}
            className="magnetic-btn px-8 py-4 rounded-full font-sheetal font-black text-sm uppercase tracking-wider text-white transition-all hover:scale-105 shadow-md inline-flex items-center gap-2 cursor-pointer border-3"
            style={{
              backgroundColor: activeFlavour.colors.primary,
              borderColor: activeFlavour.colors.dark
            }}
          >
            <MapPin className="w-4 h-4" />
            <span>Inquire Distribution & Retailers</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
