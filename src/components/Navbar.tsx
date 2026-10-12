import React, { useState } from 'react';
import { ShoppingBag, ArrowLeftRight, Search, ShieldCheck, Sun, Moon, Menu, X } from 'lucide-react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  cart: CartItem[];
  comparedProducts: Product[];
  onOpenCart: () => void;
  onOpenCompare: () => void;
  onOpenTradeIn: () => void;
  onOpenQualityGuide: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
  onGoHome: () => void;
  searchTerm: string;
  onSearchChange: (query: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  comparedProducts,
  onOpenCart,
  onOpenCompare,
  onOpenTradeIn,
  onOpenQualityGuide,
  onSelectCategory,
  activeCategory,
  onGoHome,
  searchTerm,
  onSearchChange,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      isDark ? 'bg-neutral-950/95 border-neutral-800' : 'bg-white/95 border-neutral-200'
    }`}>
      {/* Editorial Trust Banner */}
      <div className={`border-b px-4 py-1.5 text-center text-xs transition-colors ${
        isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            12-Month Commercial Warranty Included
          </span>
          <span className="hidden sm:inline opacity-40" aria-hidden="true">·</span>
          <span>30-Day Risk-Free Returns</span>
          <span className="hidden sm:inline opacity-40" aria-hidden="true">·</span>
          <span className="hidden md:inline">Free Tracked UK Delivery</span>
          <span className="hidden md:inline opacity-40" aria-hidden="true">·</span>
          <span className="text-emerald-600 font-bold">Up to 70% Less CO₂ than New</span>
        </div>
      </div>

      {/* Primary Top Bar (Follows 3-zone contract) */}
      <header className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onGoHome}
          className="text-left group flex items-center gap-2 shrink-0 cursor-pointer focus:outline-none"
        >
          <span className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors whitespace-nowrap ${
            isDark ? 'text-white group-hover:text-emerald-400' : 'text-neutral-950 group-hover:text-emerald-600'
          }`}>
            ABC <span className="text-emerald-500 font-light ml-1">Tech</span>
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className={`hidden lg:flex items-center gap-6 text-sm font-semibold transition-colors ${
          isDark ? 'text-neutral-300' : 'text-neutral-700'
        }`}>
          <button
            onClick={() => {
              onGoHome();
              onSelectCategory('all');
            }}
            className={`whitespace-nowrap transition-colors hover:text-emerald-500 cursor-pointer ${
              activeCategory === 'all' ? 'text-emerald-500 font-bold' : ''
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => {
              onGoHome();
              onSelectCategory('smartphones');
            }}
            className={`whitespace-nowrap transition-colors hover:text-emerald-500 cursor-pointer ${
              activeCategory === 'smartphones' ? 'text-emerald-500 font-bold' : ''
            }`}
          >
            Smartphones
          </button>
          <button
            onClick={() => {
              onGoHome();
              onSelectCategory('laptops');
            }}
            className={`whitespace-nowrap transition-colors hover:text-emerald-500 cursor-pointer ${
              activeCategory === 'laptops' ? 'text-emerald-500 font-bold' : ''
            }`}
          >
            Laptops
          </button>
          <button onClick={() => { onGoHome(); onSelectCategory('tablets'); }} className={`whitespace-nowrap transition-colors hover:text-emerald-500 cursor-pointer ${activeCategory === 'tablets' ? 'text-emerald-500 font-bold' : ''}`}>
            Tablets
          </button>
          <button onClick={() => { onGoHome(); onSelectCategory('wearables'); }} className={`whitespace-nowrap transition-colors hover:text-emerald-500 cursor-pointer ${activeCategory === 'wearables' ? 'text-emerald-500 font-bold' : ''}`}>
            Watches
          </button>
          <button
            onClick={onOpenTradeIn}
            className="whitespace-nowrap transition-colors hover:text-emerald-500 cursor-pointer flex items-center gap-1.5"
          >
            <span>Trade-In</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono border ${
              isDark ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}>
              Cashback
            </span>
          </button>
          <button
            onClick={onOpenQualityGuide}
            className="whitespace-nowrap transition-colors hover:text-emerald-500 cursor-pointer"
          >
            Condition Standards
          </button>
          <button
            onClick={onOpenCompare}
            className="whitespace-nowrap transition-colors hover:text-emerald-500 cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-500" />
            <span>Compare ({comparedProducts.length})</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + Theme toggle + Bag */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Quick Search */}
          <div className="relative hidden md:block w-40 xl:w-56">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full border rounded-lg pl-8 pr-3 py-1.5 text-xs transition-colors focus:outline-none focus:border-emerald-500 ${
                isDark
                  ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-900 placeholder-neutral-400'
              }`}
            />
          </div>

          {/* Theme Toggle (Light / Dark mode switch) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
              isDark
                ? 'bg-neutral-900 border-neutral-800 text-amber-400 hover:text-amber-300 hover:bg-neutral-850'
                : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle light/dark theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button: Shopping Bag */}
          <button
            onClick={onOpenCart}
            className="px-3.5 py-2 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-xs shadow-emerald-500/20"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-950" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-neutral-950 text-emerald-300 text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center">
              {totalCartCount}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 py-4 space-y-3 ${
          isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-md'
        }`}>
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search refurbished devices..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full border rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500 ${
                isDark
                  ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-900 placeholder-neutral-400'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                onGoHome();
                onSelectCategory('smartphones');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left border ${
                isDark ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-200'
              }`}
            >
              Smartphones
            </button>
            <button
              onClick={() => {
                onGoHome();
                onSelectCategory('laptops');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left border ${
                isDark ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-200'
              }`}
            >
              Laptops
            </button>
            <button onClick={() => { onGoHome(); onSelectCategory('tablets'); setMobileMenuOpen(false); }} className={`p-2.5 rounded-lg text-left border ${isDark ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-200'}`}>Tablets</button>
            <button onClick={() => { onGoHome(); onSelectCategory('wearables'); setMobileMenuOpen(false); }} className={`p-2.5 rounded-lg text-left border ${isDark ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-200'}`}>Watches</button>
            <button
              onClick={() => {
                onOpenTradeIn();
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left border flex items-center justify-between ${
                isDark ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-200'
              }`}
            >
              <span>Trade-In Tech</span>
              <span className="text-[10px] text-emerald-600 font-bold">Cashback</span>
            </button>
            <button
              onClick={() => {
                onOpenQualityGuide();
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left border ${
                isDark ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-200'
              }`}
            >
              Condition Standards
            </button>
            <button
              onClick={() => {
                onOpenCompare();
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left border col-span-2 flex items-center justify-between ${
                isDark ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-500" />
                Comparison Tool
              </span>
              <span className="font-mono text-emerald-600 font-bold">{comparedProducts.length} selected</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
