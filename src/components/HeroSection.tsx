import React from 'react';
import { ShieldCheck, Sparkles, RefreshCcw, Leaf, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
  onExploreClick: () => void;
  onOpenTradeIn: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  activeCategory,
  onExploreClick,
  onOpenTradeIn,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Background visual ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Certified Refurbished Standard 2025/2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Flagship Technology. Given a Second Life.
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              Buy verified refurbished iPhone 16, MacBook Pro, Galaxy S24, and Pixel 9 at up to 45% below brand-new retail. Each device undergoes an intensive 25-point UK hardware diagnostic with an included 12-month commercial warranty.
            </p>

            {/* Quick interactive category segmented controls */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mr-1">
                Explore:
              </span>
              <button
                onClick={() => onSelectCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                All Gadgets
              </button>
              <button
                onClick={() => onSelectCategory('smartphones')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'smartphones'
                    ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                iPhones & Smartphones
              </button>
              <button
                onClick={() => onSelectCategory('laptops')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'laptops'
                    ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                MacBooks & Laptops
              </button>
            </div>

            {/* Direct Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-5 py-2.5 text-sm font-semibold text-neutral-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <span>Browse Refurbished Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenTradeIn}
                className="px-5 py-2.5 text-sm font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4 text-emerald-400" />
                <span>Trade-In Old Phone for Voucher</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero High-Res Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_refurbished_flagship_1791795384385.jpg"
                alt="Refurbished flagship Apple and Android electronics"
                className="w-full h-72 sm:h-84 lg:h-96 object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-neutral-950/80 backdrop-blur-md rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Apple · Samsung · Google</p>
                  <p className="text-[11px] text-neutral-400">100% Factory Restored & Verified</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 font-mono">From £329</span>
                  <p className="text-[10px] text-neutral-500 line-through">Retail £799+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Metric Trust Strip */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800/60">
            <p className="text-xs text-neutral-400">Quality Diagnostic</p>
            <p className="text-base sm:text-lg font-bold text-white mt-0.5 font-mono">25-Point Check</p>
            <p className="text-[11px] text-neutral-500 mt-1">Hardware & battery verified</p>
          </div>
          <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800/60">
            <p className="text-xs text-neutral-400">Commercial Protection</p>
            <p className="text-base sm:text-lg font-bold text-white mt-0.5 font-mono">12 to 36 Months</p>
            <p className="text-[11px] text-neutral-500 mt-1">Free express repair or replace</p>
          </div>
          <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800/60">
            <p className="text-xs text-neutral-400">Average Savings</p>
            <p className="text-base sm:text-lg font-bold text-emerald-400 mt-0.5 font-mono tabular-nums">£210 / Unit</p>
            <p className="text-[11px] text-neutral-500 mt-1">Compared to new retail list</p>
          </div>
          <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800/60">
            <p className="text-xs text-neutral-400">Environmental Impact</p>
            <p className="text-base sm:text-lg font-bold text-emerald-400 mt-0.5 font-mono tabular-nums">78kg CO₂e</p>
            <p className="text-[11px] text-neutral-500 mt-1">Raw emissions diverted</p>
          </div>
        </div>
      </div>
    </section>
  );
};
