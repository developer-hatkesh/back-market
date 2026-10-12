import React from 'react';
import { Product } from '../types';
import { ArrowLeftRight, X, ChevronRight } from 'lucide-react';

interface FloatingCompareBarProps {
  comparedProducts: Product[];
  onOpenCompare: () => void;
  onRemoveProduct: (id: string) => void;
  onClearAll: () => void;
}

export const FloatingCompareBar: React.FC<FloatingCompareBarProps> = ({
  comparedProducts,
  onOpenCompare,
  onRemoveProduct,
  onClearAll,
}) => {
  if (comparedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
          <ArrowLeftRight className="w-4 h-4" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {comparedProducts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-200 shrink-0"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-5 h-5 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-medium max-w-[100px] truncate">{p.name}</span>
              <button
                type="button"
                onClick={() => onRemoveProduct(p.id)}
                className="text-neutral-500 hover:text-rose-400 p-0.5 cursor-pointer"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-neutral-400 hover:text-white px-2 py-1.5 transition-colors cursor-pointer hidden sm:block"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onOpenCompare}
          className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
        >
          <span>Compare ({comparedProducts.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
