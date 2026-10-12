import React from 'react';
import { FilterState, ConditionGrade, StorageOption } from '../types';
import { RotateCcw, Shield, Check, SlidersHorizontal } from 'lucide-react';
import { CONDITION_DETAILS } from '../data/products';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
  isDark?: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
  isDark = true,
}) => {
  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const toggleCondition = (condition: ConditionGrade) => {
    const next = filters.conditions.includes(condition)
      ? filters.conditions.filter((c) => c !== condition)
      : [...filters.conditions, condition];
    onChange({ ...filters, conditions: next });
  };

  const toggleWarranty = (w: string) => {
    const next = filters.warranty.includes(w)
      ? filters.warranty.filter((item) => item !== w)
      : [...filters.warranty, w];
    onChange({ ...filters, warranty: next });
  };

  const toggleStorage = (s: StorageOption) => {
    const next = filters.storage.includes(s)
      ? filters.storage.filter((item) => item !== s)
      : [...filters.storage, s];
    onChange({ ...filters, storage: next });
  };

  const handlePricePreset = (min: number, max: number) => {
    onChange({ ...filters, priceRange: [min, max] });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.conditions.length > 0 ||
    filters.warranty.length > 0 ||
    filters.storage.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 2000;

  return (
    <div className={`rounded-2xl p-5 space-y-6 border transition-colors ${
      isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between pb-4 border-b ${
        isDark ? 'border-neutral-800' : 'border-neutral-200'
      }`}>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
          <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Filter Tech
          </span>
          <span className={`text-xs font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            ({totalResults})
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className={`text-xs flex items-center gap-1 cursor-pointer font-medium ${
              isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Brand Filter */}
      <div className="space-y-2.5">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${
          isDark ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Brand / Ecosystem
        </h4>
        <div className="space-y-1.5">
          {['Apple', 'Samsung', 'Google'].map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left border ${
                  checked
                    ? isDark
                      ? 'bg-neutral-800 text-white border-neutral-700'
                      : 'bg-emerald-50 text-neutral-900 border-emerald-300'
                    : isDark
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40 border-transparent'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border-transparent'
                }`}
              >
                <span>{brand}</span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                    checked
                      ? 'bg-emerald-500 text-neutral-950 border-emerald-500 font-bold'
                      : isDark
                      ? 'border-neutral-700'
                      : 'border-neutral-300'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Warranty Duration Filter (Prompt Requirement) */}
      <div className={`space-y-2.5 pt-4 border-t ${
        isDark ? 'border-neutral-800' : 'border-neutral-200'
      }`}>
        <div className="flex items-center justify-between">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Warranty Duration
          </h4>
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
        </div>
        <div className="space-y-1.5">
          {[
            { id: '12m', label: '12 Months (Included)' },
            { id: '24m', label: '24 Months Care' },
            { id: '36m', label: '36 Months Complete' },
          ].map((item) => {
            const checked = filters.warranty.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleWarranty(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left border ${
                  checked
                    ? isDark
                      ? 'bg-neutral-800 text-white border-neutral-700'
                      : 'bg-emerald-50 text-neutral-900 border-emerald-300'
                    : isDark
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40 border-transparent'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border-transparent'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] shrink-0 ml-2 ${
                    checked
                      ? 'bg-emerald-500 text-neutral-950 border-emerald-500 font-bold'
                      : isDark
                      ? 'border-neutral-700'
                      : 'border-neutral-300'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter (Prompt Requirement) */}
      <div className={`space-y-3 pt-4 border-t ${
        isDark ? 'border-neutral-800' : 'border-neutral-200'
      }`}>
        <div className="flex items-center justify-between">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Price Range (£)
          </h4>
          <span className="text-xs font-mono font-bold text-emerald-600 tabular-nums">
            £{filters.priceRange[0]} – £{filters.priceRange[1]}
          </span>
        </div>

        {/* Price Slider */}
        <div className="px-1">
          <input
            type="range"
            min={200}
            max={1800}
            step={25}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onChange({
                ...filters,
                priceRange: [filters.priceRange[0], parseInt(e.target.value, 10)],
              })
            }
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Quick Range Presets */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => handlePricePreset(0, 450)}
            className={`px-2 py-1.5 text-[11px] rounded-lg border cursor-pointer font-medium ${
              isDark
                ? 'bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border-neutral-700/60'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
            }`}
          >
            Under £450
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset(450, 750)}
            className={`px-2 py-1.5 text-[11px] rounded-lg border cursor-pointer font-medium ${
              isDark
                ? 'bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border-neutral-700/60'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
            }`}
          >
            £450 – £750
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset(750, 1000)}
            className={`px-2 py-1.5 text-[11px] rounded-lg border cursor-pointer font-medium ${
              isDark
                ? 'bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border-neutral-700/60'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
            }`}
          >
            £750 – £1,000
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset(1000, 2000)}
            className={`px-2 py-1.5 text-[11px] rounded-lg border cursor-pointer font-medium ${
              isDark
                ? 'bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border-neutral-700/60'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
            }`}
          >
            £1,000+
          </button>
        </div>
      </div>

      {/* Condition Grades Filter */}
      <div className={`space-y-2.5 pt-4 border-t ${
        isDark ? 'border-neutral-800' : 'border-neutral-200'
      }`}>
        <h4 className={`text-xs font-bold uppercase tracking-wider ${
          isDark ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Refurbished Condition
        </h4>
        <div className="space-y-1.5">
          {(['fair', 'good', 'excellent', 'premium'] as ConditionGrade[]).map((grade) => {
            const checked = filters.conditions.includes(grade);
            const info = CONDITION_DETAILS[grade];
            return (
              <button
                key={grade}
                type="button"
                onClick={() => toggleCondition(grade)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left border ${
                  checked
                    ? isDark
                      ? 'bg-neutral-800 text-white border-neutral-700'
                      : 'bg-emerald-50 text-neutral-900 border-emerald-300'
                    : isDark
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40 border-transparent'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border-transparent'
                }`}
              >
                <div>
                  <div className="font-semibold">{info.title}</div>
                  <div className={`text-[10px] line-clamp-1 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    {info.body}
                  </div>
                </div>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] shrink-0 ml-2 ${
                    checked
                      ? 'bg-emerald-500 text-neutral-950 border-emerald-500 font-bold'
                      : isDark
                      ? 'border-neutral-700'
                      : 'border-neutral-300'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Capacity Filter */}
      <div className={`space-y-2.5 pt-4 border-t ${
        isDark ? 'border-neutral-800' : 'border-neutral-200'
      }`}>
        <h4 className={`text-xs font-bold uppercase tracking-wider ${
          isDark ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Internal Storage
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {(['128GB', '256GB', '512GB', '1TB'] as StorageOption[]).map((size) => {
            const checked = filters.storage.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleStorage(size)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer text-center border ${
                  checked
                    ? 'bg-emerald-500/20 text-emerald-600 border-emerald-500/50'
                    : isDark
                    ? 'bg-neutral-800/50 text-neutral-400 hover:text-white border-neutral-800'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border-neutral-200'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
