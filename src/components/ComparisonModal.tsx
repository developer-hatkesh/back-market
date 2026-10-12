import React from 'react';
import { Product } from '../types';
import {
  X,
  ArrowLeftRight,
  ShieldCheck,
  Check,
  Plus,
  Trash2,
  Leaf,
  Sparkles,
} from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveProduct: (id: string) => void;
  onClearAll: () => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
  onAddProduct: (product: Product) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveProduct,
  onClearAll,
  onSelectProduct,
  allProducts,
  onAddProduct,
}) => {
  if (!isOpen) return null;

  const availableToAdd = allProducts.filter(
    (p) => !comparedProducts.some((c) => c.id === p.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Side-by-Side Device Comparison
              </h3>
              <p className="text-xs text-neutral-400">
                Compare refurbished specifications, retail savings, and environmental footprint.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-neutral-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 cursor-pointer"
              aria-label="Close comparison view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-x-auto overflow-y-auto p-4 sm:p-6 flex-grow">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">No devices in comparison yet</h4>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Click the &ldquo;Compare&rdquo; button on any product card or detail page to inspect tech specs side-by-side.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {allProducts.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddProduct(p)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white cursor-pointer"
                  >
                    + Add {p.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="min-w-[680px]">
              {/* Product Header Row */}
              <div className="grid grid-cols-12 gap-4 pb-6 border-b border-neutral-800">
                <div className="col-span-3 flex flex-col justify-end text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Device Breakdown
                </div>
                {comparedProducts.map((p) => {
                  const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                  const savings = p.priceNew - p.basePrice;
                  const savingsPercent = Math.round((savings / p.priceNew) * 100);

                  return (
                    <div
                      key={p.id}
                      className="space-y-3 relative bg-neutral-900/40 p-3.5 rounded-2xl border border-neutral-800/80"
                      style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                    >
                      <button
                        onClick={() => onRemoveProduct(p.id)}
                        className="absolute top-2 right-2 p-1 rounded-md text-neutral-500 hover:text-rose-400 bg-neutral-950/80 cursor-pointer"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-32 flex items-center justify-center">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500">
                          {p.brand}
                        </span>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{p.name}</h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-base font-extrabold text-white font-mono tabular-nums">
                            From £{p.basePrice}
                          </span>
                          <span className="text-xs text-neutral-500 line-through font-mono">
                            £{p.priceNew}
                          </span>
                        </div>
                        <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                          Save £{savings} ({savingsPercent}% off)
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="w-full py-2 rounded-lg text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer"
                      >
                        Configure & Buy
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Specs Rows */}
              <div className="divide-y divide-neutral-900 text-xs">
                {/* Display */}
                <div className="grid grid-cols-12 gap-4 py-3.5 items-center">
                  <div className="col-span-3 font-semibold text-neutral-400">Display & Panel</div>
                  {comparedProducts.map((p) => {
                    const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                    return (
                      <div
                        key={p.id}
                        className="text-neutral-200"
                        style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                      >
                        <p className="font-semibold">{p.specs.screenSize}</p>
                        <p className="text-neutral-400 text-[11px] mt-0.5">{p.specs.screen}</p>
                        <p className="text-neutral-500 text-[10px] font-mono">{p.specs.resolution}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Processor */}
                <div className="grid grid-cols-12 gap-4 py-3.5 items-center">
                  <div className="col-span-3 font-semibold text-neutral-400">Processor / SoC</div>
                  {comparedProducts.map((p) => {
                    const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                    return (
                      <div
                        key={p.id}
                        className="text-neutral-200 font-mono text-[11px]"
                        style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                      >
                        <p className="font-bold text-white">{p.specs.chipset}</p>
                        <p className="text-neutral-400 mt-0.5">{p.specs.ram}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Camera System */}
                <div className="grid grid-cols-12 gap-4 py-3.5 items-center">
                  <div className="col-span-3 font-semibold text-neutral-400">Camera System</div>
                  {comparedProducts.map((p) => {
                    const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                    return (
                      <div
                        key={p.id}
                        className="text-neutral-200 text-[11px]"
                        style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                      >
                        <p className="font-medium text-neutral-100">Rear: {p.specs.rearCamera}</p>
                        <p className="text-neutral-400 mt-0.5">Front: {p.specs.frontCamera}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Battery Life */}
                <div className="grid grid-cols-12 gap-4 py-3.5 items-center">
                  <div className="col-span-3 font-semibold text-neutral-400">Battery Endurance</div>
                  {comparedProducts.map((p) => {
                    const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                    return (
                      <div
                        key={p.id}
                        className="text-neutral-200 text-[11px]"
                        style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                      >
                        <p className="font-semibold text-white">{p.specs.batteryLife}</p>
                        <p className="text-emerald-400 text-[10px] mt-0.5">
                          $\ge 85\%$ guaranteed or brand new option
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Storage Options */}
                <div className="grid grid-cols-12 gap-4 py-3.5 items-center">
                  <div className="col-span-3 font-semibold text-neutral-400">Available Storage</div>
                  {comparedProducts.map((p) => {
                    const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                    return (
                      <div
                        key={p.id}
                        className="text-neutral-300 font-mono text-[11px]"
                        style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                      >
                        {p.storageOptions.map((s) => s.size).join(' · ')}
                      </div>
                    );
                  })}
                </div>

                {/* Operating System */}
                <div className="grid grid-cols-12 gap-4 py-3.5 items-center">
                  <div className="col-span-3 font-semibold text-neutral-400">Software & OS</div>
                  {comparedProducts.map((p) => {
                    const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                    return (
                      <div
                        key={p.id}
                        className="text-neutral-300 text-[11px]"
                        style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                      >
                        <p>{p.specs.os}</p>
                        <p className="text-neutral-500 text-[10px]">Release Year: {p.specs.releaseYear}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Environmental Footprint */}
                <div className="grid grid-cols-12 gap-4 py-3.5 items-center bg-emerald-950/20 -mx-4 px-4 sm:-mx-6 sm:px-6">
                  <div className="col-span-3 font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Eco Impact Spared</span>
                  </div>
                  {comparedProducts.map((p) => {
                    const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                    return (
                      <div
                        key={p.id}
                        className="text-emerald-300 text-[11px]"
                        style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                      >
                        <p className="font-bold">{p.co2SavedKg}kg CO₂e spared</p>
                        <p className="text-neutral-400 text-[10px] mt-0.5">{p.eWasteSavedGrams}g electronic waste</p>
                      </div>
                    );
                  })}
                </div>

                {/* Warranty Included */}
                <div className="grid grid-cols-12 gap-4 py-3.5 items-center">
                  <div className="col-span-3 font-semibold text-neutral-400">Warranty Coverage</div>
                  {comparedProducts.map((p) => {
                    const colSpan = Math.floor(9 / Math.max(1, comparedProducts.length));
                    return (
                      <div
                        key={p.id}
                        className="text-neutral-300 text-[11px] flex items-center gap-1"
                        style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>12 Months (Extendable to 36m)</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Device to Compare if slots left */}
              {comparedProducts.length < 3 && availableToAdd.length > 0 && (
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-neutral-400 font-semibold mr-2">
                    Add another device to compare:
                  </span>
                  {availableToAdd.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onAddProduct(p)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-emerald-400" />
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
