import React, { useRef } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface ProductSliderSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onViewAll?: () => void;
  isDark: boolean;
}

export const ProductSliderSection: React.FC<ProductSliderSectionProps> = ({
  title,
  subtitle,
  products,
  onSelectProduct,
  comparedProducts,
  onToggleCompare,
  onViewAll,
  isDark,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className={`py-10 sm:py-12 border-b transition-colors ${
      isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-neutral-50/50 border-neutral-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              {title}
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 flex items-center gap-1 cursor-pointer mr-2"
              >
                <span>View all ({products.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => handleScroll('left')}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-xs'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-xs'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Tray */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onSelectProduct={onSelectProduct}
                isCompared={comparedProducts.some((p) => p.id === product.id)}
                onToggleCompare={onToggleCompare}
                isDark={isDark}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
