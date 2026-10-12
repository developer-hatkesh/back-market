import React from 'react';
import { Product, ConditionGrade } from '../types';
import { CONDITION_DETAILS } from '../data/products';
import { ArrowLeftRight, Check, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  isDark?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  isCompared,
  onToggleCompare,
  isDark = true,
}) => {
  const savings = product.priceNew - product.basePrice;
  const savingsPercent = Math.round((savings / product.priceNew) * 100);

  return (
    <div className={`group relative rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between border ${
      isDark
        ? 'bg-neutral-900/70 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-white'
        : 'bg-white hover:bg-neutral-50/50 border-neutral-200 hover:border-neutral-300 text-neutral-900 shadow-sm hover:shadow-md'
    }`}>
      {/* Card Header & Compare Trigger */}
      <div className="p-4 pb-2 flex items-center justify-between text-xs z-10">
        <span className={`font-semibold uppercase tracking-wider text-[11px] ${
          isDark ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          {product.brand}
        </span>

        {/* Compare Checkbox Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            isCompared
              ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/40'
              : isDark
              ? 'bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-700/50'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 border border-neutral-200'
          }`}
          aria-label={`Toggle comparison for ${product.name}`}
        >
          {isCompared ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span>Comparing</span>
            </>
          ) : (
            <>
              <ArrowLeftRight className="w-3 h-3" />
              <span>Compare</span>
            </>
          )}
        </button>
      </div>

      {/* Product Image Area */}
      <div
        onClick={() => onSelectProduct(product)}
        className="px-6 py-4 cursor-pointer flex items-center justify-center relative overflow-hidden"
      >
        <div className="w-full h-48 sm:h-52 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Quiet Savings Note */}
        <div className={`absolute bottom-2 left-4 text-[11px] font-semibold px-2 py-0.5 rounded border ${
          isDark
            ? 'text-emerald-400 bg-neutral-950/80 backdrop-blur-sm border-emerald-900/50'
            : 'text-emerald-700 bg-emerald-50 border-emerald-200 shadow-xs'
        }`}>
          Save £{savings} ({savingsPercent}%)
        </div>
      </div>

      {/* Product Information */}
      <div
        onClick={() => onSelectProduct(product)}
        className={`p-4 sm:p-5 pt-2 flex flex-col flex-grow justify-between cursor-pointer border-t ${
          isDark ? 'border-neutral-800/60 bg-neutral-900/40' : 'border-neutral-100 bg-neutral-50/40'
        }`}
      >
        <div>
          <div className="flex items-center gap-1 text-[11px] text-neutral-400 mb-1">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className={`font-semibold ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
              {product.rating}
            </span>
            <span className={isDark ? 'text-neutral-500' : 'text-neutral-400'}>
              ({product.reviewCount})
            </span>
            <span className="mx-1 text-neutral-400">·</span>
            <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
              {product.specs.screenSize}
            </span>
          </div>

          <h3 className={`text-base font-bold transition-colors line-clamp-1 ${
            isDark ? 'text-white group-hover:text-emerald-400' : 'text-neutral-900 group-hover:text-emerald-600'
          }`}>
            {product.name}
          </h3>

          <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            {product.tagline}
          </p>

          {/* Color swatches preview */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3.5 h-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 inline-block shadow-inner"
                style={{ backgroundColor: c.hex }}
                title={c.label}
              />
            ))}
            <span className={`text-[11px] ml-1.5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              {product.storageOptions.map((s) => s.size).join(' / ')}
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className={`mt-4 pt-3 border-t flex items-end justify-between ${
          isDark ? 'border-neutral-800/80' : 'border-neutral-200'
        }`}>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-lg font-extrabold font-mono tabular-nums ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                £{product.basePrice}
              </span>
              <span className="text-xs text-neutral-400 line-through font-mono tabular-nums">
                £{product.priceNew}
              </span>
            </div>
            <div className={`text-[11px] flex items-center gap-1 mt-0.5 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>12m warranty incl.</span>
            </div>
          </div>

          <button
            type="button"
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              isDark
                ? 'text-neutral-900 bg-white group-hover:bg-emerald-400'
                : 'text-white bg-neutral-900 group-hover:bg-emerald-600'
            }`}
          >
            Configure
          </button>
        </div>
      </div>
    </div>
  );
};
