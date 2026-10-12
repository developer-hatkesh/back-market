import React from 'react';
import { ShieldCheck, Leaf } from 'lucide-react';

interface FooterProps {
  onOpenTradeIn: () => void;
  onOpenQualityGuide: () => void;
  onSelectCategory: (cat: string) => void;
  isDark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTradeIn,
  onOpenQualityGuide,
  onSelectCategory,
  isDark = true,
}) => {
  return (
    <footer className={`border-t text-xs mt-20 transition-colors ${
      isDark ? 'bg-neutral-950 border-neutral-900 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
    }`}>
      {/* Upper Newsletter / Eco banner */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b ${
        isDark ? 'border-neutral-900' : 'border-neutral-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold mb-2">
              <Leaf className="w-4 h-4" />
              <span>Certified Circular Economy Retailer</span>
            </div>
            <h4 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-neutral-950'}`}>
              Every refurbished phone prevents up to 80% of its lifecycle carbon.
            </h4>
            <p className={`mt-2 max-w-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Buying refurbished is the single most effective technological action for cutting e-waste and sparing cobalt, lithium, and rare earth mining.
            </p>
          </div>

          <div className={`rounded-2xl p-5 space-y-3 border ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
          }`}>
            <h5 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Join the ABC Tech Circle
            </h5>
            <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Get secret drops of rare refurbished flagships, warranty extensions, and trade-in boost alerts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`flex-grow border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 ${
                  isDark ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Primary Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <h5 className={`font-bold text-sm mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Refurbished Devices
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectCategory('smartphones')}
                className="hover:text-emerald-500 transition-colors cursor-pointer text-left"
              >
                Refurbished iPhone 16 & 15
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('smartphones')}
                className="hover:text-emerald-500 transition-colors cursor-pointer text-left"
              >
                Samsung Galaxy S24 & Z Flip
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('smartphones')}
                className="hover:text-emerald-500 transition-colors cursor-pointer text-left"
              >
                Google Pixel 9 & 8a
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('laptops')}
                className="hover:text-emerald-500 transition-colors cursor-pointer text-left"
              >
                MacBook Pro & MacBook Air
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h5 className={`font-bold text-sm mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            ABC Tech
          </h5>
          <ul className="space-y-2">
            <li>
              <button onClick={onOpenQualityGuide} className="hover:text-emerald-500 transition-colors cursor-pointer text-left">
                Cosmetic Grading Standards
              </button>
            </li>
            <li>
              <button onClick={onOpenTradeIn} className="hover:text-emerald-500 transition-colors cursor-pointer text-left">
                Sell / Trade-In Old Tech
              </button>
            </li>
            <li>
              <span className="hover:text-emerald-500 cursor-pointer">12-Month Commercial Warranty</span>
            </li>
            <li>
              <span className="hover:text-emerald-500 cursor-pointer">30-Day Risk-Free Returns</span>
            </li>
          </ul>
        </div>

        <div>
          <h5 className={`font-bold text-sm mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Delivery & Support
          </h5>
          <ul className="space-y-2">
            <li>
              <span>DPD Next-Day Tracked (Free)</span>
            </li>
            <li>
              <span>Royal Mail Special Delivery</span>
            </li>
            <li>
              <span>Battery Health Certification</span>
            </li>
            <li>
              <span>Help & Returns Portal</span>
            </li>
          </ul>
        </div>

        <div>
          <h5 className={`font-bold text-sm mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Accepted Payments
          </h5>
          <p className={`text-[11px] mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Apple Pay · Google Pay · Visa · Mastercard · Klarna (Pay in 3) · Clearpay
          </p>
          <div className={`p-3 rounded-xl space-y-1 border ${
            isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className={`flex items-center gap-1.5 font-bold text-xs ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>ABC Tech Quality Charter</span>
            </div>
            <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Audited by UK electronic quality engineers.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t py-6 px-4 sm:px-6 ${isDark ? 'border-neutral-900' : 'border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] opacity-75">
          <div>
            © {new Date().getFullYear()} ABC Tech. Independent refurbished-tech demo.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
