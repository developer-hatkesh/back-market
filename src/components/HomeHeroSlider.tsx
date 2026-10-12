import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Sparkles, Leaf, RefreshCcw } from 'lucide-react';
import { Product } from '../types';
import { heroRefurbished, iphoneShowcase, macbookShowcase } from '../assets/imageAssets';

interface HomeHeroSliderProps {
  onExploreCategory: (cat: string) => void;
  onOpenTradeIn: () => void;
  onSelectProductBySlug: (slug: string) => void;
  isDark: boolean;
}

export const HomeHeroSlider: React.FC<HomeHeroSliderProps> = ({
  onExploreCategory,
  onOpenTradeIn,
  onSelectProductBySlug,
  isDark,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-iphone16',
      badge: 'Certified Flagship Refurbished',
      title: 'iPhone 16 & Flagship Phones. Up to 40% Off.',
      description: 'Tested across 25 hardware diagnostics with genuine displays, minimum 85% battery health, and a complimentary 12-month UK commercial warranty.',
      image: iphoneShowcase,
      ctaText: 'Configure iPhone 16',
      ctaAction: () => onSelectProductBySlug('iphone-16'),
      secondaryText: 'Browse All Phones',
      secondaryAction: () => onExploreCategory('smartphones'),
      pricePill: 'Refurb from £629 · Retail £799',
      ecoTag: '64kg CO₂e saved',
    },
    {
      id: 'slide-macbook',
      badge: 'Pro Studio Performance',
      title: 'Apple MacBook Pro & Air with M3. From £829.',
      description: 'Retina XDR displays, multi-day battery longevity, and silent high-speed processing. Zero compromises, backed by 30-day money-back guarantee.',
      image: macbookShowcase,
      ctaText: 'Explore MacBooks',
      ctaAction: () => onExploreCategory('laptops'),
      secondaryText: 'Configure MacBook Pro',
      secondaryAction: () => onSelectProductBySlug('macbook-pro-14-m3'),
      pricePill: 'Save up to £450 vs new',
      ecoTag: '215kg CO₂e saved',
    },
    {
      id: 'slide-tradein',
      badge: 'Instant Cash Voucher',
      title: 'Trade In Your Old Gadget. Get Up to £250 Credit.',
      description: 'Send us your old phone, tablet, or laptop with free prepaid postage. Receive instant credit applied directly to your refurbished basket.',
      image: heroRefurbished,
      ctaText: 'Calculate Trade-In Value',
      ctaAction: onOpenTradeIn,
      secondaryText: 'View Condition Guide',
      secondaryAction: () => onExploreCategory('all'),
      pricePill: 'Instant valuation in 60s',
      ecoTag: 'Zero e-waste landfill',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className={`relative overflow-hidden border-b transition-colors duration-200 ${
      isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100/70 border-neutral-200'
    }`}>
      {/* Slider Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5 animate-in fade-in duration-300">
            <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-md border ${
              isDark
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.badge}</span>
            </div>

            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`} style={{ textWrap: 'balance' }}>
              {slide.title}
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              {slide.description}
            </p>

            {/* Badges / Micro Proof */}
            <div className="flex items-center gap-3 flex-wrap text-xs">
              <span className={`font-mono font-bold px-2.5 py-1 rounded-md border ${
                isDark ? 'bg-neutral-900 border-neutral-800 text-emerald-400' : 'bg-white border-neutral-200 text-emerald-600 shadow-sm'
              }`}>
                {slide.pricePill}
              </span>
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
                isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-700 shadow-sm'
              }`}>
                <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                <span>{slide.ecoTag}</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3.5 pt-2 flex-wrap">
              <button
                onClick={slide.ctaAction}
                className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={slide.secondaryAction}
                className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                  isDark
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800'
                    : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-200 shadow-sm'
                }`}
              >
                {slide.secondaryText}
              </button>
            </div>
          </div>

          {/* Right Image Showcase Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className={`w-full rounded-3xl p-6 sm:p-8 border shadow-xl flex items-center justify-center min-h-[300px] sm:min-h-[360px] relative overflow-hidden transition-colors ${
              isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <img
                src={slide.image}
                alt={slide.title}
                className="max-h-64 sm:max-h-76 max-w-full object-contain filter drop-shadow-2xl transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Verified seal */}
              <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 shadow-sm ${
                isDark ? 'bg-neutral-950/90 border-neutral-800 text-white' : 'bg-white/95 border-neutral-200 text-neutral-900'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>12m Warranty Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows & Dots */}
        <div className="flex items-center justify-between pt-6 sm:pt-8 mt-4 border-t border-neutral-800/20">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 bg-emerald-500'
                    : isDark
                    ? 'w-2 bg-neutral-800 hover:bg-neutral-700'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-sm'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-sm'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
