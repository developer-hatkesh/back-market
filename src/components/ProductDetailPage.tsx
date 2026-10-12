import React, { useState } from 'react';
import {
  Product,
  ConditionGrade,
  StorageOption,
  ColorOption,
  BatteryHealthTier,
  WarrantyDuration,
  CartItem,
} from '../types';
import {
  CONDITION_DETAILS,
  TECHNICAL_INSPECTION_POINTS,
  VERIFIED_REVIEWS,
} from '../data/products';
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ArrowLeftRight,
  BatteryCharging,
  Leaf,
  Info,
  ChevronRight,
  Shield,
  ShoppingBag,
  HardDrive,
  Palette,
  Battery,
  Smartphone,
  Radio,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onOpenTradeIn: () => void;
  onOpenQualityGuide: () => void;
  onOpenInspection: () => void;
  isDark?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onToggleCompare,
  isCompared,
  onOpenTradeIn,
  onOpenQualityGuide,
  onOpenInspection,
  isDark = true,
}) => {
  // Option states
  const [selectedCondition, setSelectedCondition] = useState<ConditionGrade>(
    product.defaultCondition
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(
    product.storageOptions[0].size
  );
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedBattery, setSelectedBattery] = useState<BatteryHealthTier>('standard');
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyDuration>('12_months');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  // Dynamic price calculation
  const storageOption = product.storageOptions.find((s) => s.size === selectedStorage);
  const storageDelta = storageOption ? storageOption.priceDelta : 0;
  const conditionInfo = CONDITION_DETAILS[selectedCondition];
  const conditionDelta = Math.round(product.basePrice * (conditionInfo.priceMultiplier - 1));
  const batteryDelta = selectedBattery === 'brand_new' ? 39 : 0;
  const warrantyDelta =
    selectedWarranty === '24_months' ? 49 : selectedWarranty === '36_months' ? 89 : 0;

  const currentRefurbPrice =
    product.basePrice + storageDelta + conditionDelta + batteryDelta + warrantyDelta;
  const savings = Math.max(0, product.priceNew - currentRefurbPrice);
  const savingsPercent = Math.round((savings / product.priceNew) * 100);

  const handleBuyClick = () => {
    onAddToCart({
      productId: product.id,
      product,
      selectedColor,
      selectedStorage,
      selectedCondition,
      selectedBattery,
      selectedWarranty,
      price: currentRefurbPrice,
      quantity: 1,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  return (
    <div className={`min-w-0 pb-24 transition-colors ${
      isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50/70 text-neutral-900'
    }`}>
      {/* Breadcrumb Navigation */}
      <div className={`border-b transition-colors ${
        isDark ? 'border-neutral-900 bg-neutral-950/80' : 'border-neutral-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs">
          <button
            onClick={onBack}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer font-medium ${
              isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to products</span>
          </button>

          <div className={`hidden sm:flex items-center gap-2 ${
            isDark ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            <span>Home</span>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span>{product.brand}</span>
            <span>/</span>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Visual Showcase & Sticky Gallery */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Showcase Image Card */}
            <div className={`relative rounded-3xl p-8 flex items-center justify-center min-h-[360px] sm:min-h-[420px] overflow-hidden border shadow-sm transition-colors ${
              isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <img
                src={product.gallery[activeImageIndex] || product.image}
                alt={`${product.name} in ${selectedColor.label}`}
                className="max-h-[320px] sm:max-h-[380px] max-w-full object-contain filter drop-shadow-xl transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Verified Atelier Seal */}
              <div className={`absolute top-4 left-4 rounded-xl px-3 py-1.5 flex items-center gap-2 border text-xs font-semibold shadow-xs ${
                isDark ? 'bg-neutral-950/90 border-neutral-800 text-white' : 'bg-white/95 border-neutral-200 text-neutral-900'
              }`}>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>UK Certified Refurbished</span>
              </div>

              {/* Compare toggle in image */}
              <button
                type="button"
                onClick={() => onToggleCompare(product)}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  isCompared
                    ? 'bg-emerald-500/20 text-emerald-600 border-emerald-500/40'
                    : isDark
                    ? 'bg-neutral-950/80 text-neutral-300 hover:text-white border-neutral-800'
                    : 'bg-white text-neutral-700 hover:text-neutral-900 border-neutral-200 shadow-xs'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>{isCompared ? 'Comparing' : 'Compare'}</span>
              </button>

              {/* Active Color Preview Indicator */}
              <div className={`absolute bottom-4 left-4 text-xs px-3 py-1 rounded-lg border ${
                isDark ? 'text-neutral-300 bg-neutral-950/80 border-neutral-800' : 'text-neutral-700 bg-white/90 border-neutral-200 shadow-xs'
              }`}>
                Selected: <span className="font-bold">{selectedColor.label}</span>
              </div>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-18 w-22 rounded-xl overflow-hidden border p-2 cursor-pointer transition-colors ${
                      activeImageIndex === idx
                        ? 'border-emerald-500 ring-1 ring-emerald-500'
                        : isDark
                        ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail view"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Eco Impact & 25-Point Callout Card */}
            <div className={`rounded-2xl p-4 border flex items-center justify-between text-xs ${
              isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-emerald-50/50 border-emerald-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-neutral-950 flex items-center justify-center font-bold">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <p className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    {product.co2SavedKg}kg of CO₂e Spared
                  </p>
                  <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Diverts {product.eWasteSavedGrams}g of e-waste from UK landfills
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenInspection}
                className="text-[11px] text-emerald-600 hover:underline font-bold cursor-pointer shrink-0"
              >
                25-Point Checklist
              </button>
            </div>
          </div>

          {/* Right Column: SECTION-PER-OPTION CONFIGURATOR (Back Market Style) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Product Title Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                <span>{product.brand}</span>
                <span>·</span>
                <span>Factory Refurbished & 100% Unlocked</span>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}>
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    {product.rating}
                  </span>
                  <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="text-emerald-600 font-semibold">12-Month Warranty Included</span>
              </div>
            </div>

            {/* Price Banner Strip */}
            <div className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between flex-wrap gap-4 ${
              isDark ? 'bg-neutral-900/70 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
            }`}>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums ${
                    isDark ? 'text-white' : 'text-neutral-950'
                  }`}>
                    £{currentRefurbPrice}
                  </span>
                  <span className="text-sm text-neutral-400 line-through font-mono tabular-nums">
                    £{product.priceNew} new
                  </span>
                </div>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Or 3 payments of <span className="font-bold font-mono">£{(currentRefurbPrice / 3).toFixed(2)}</span> with Klarna / Clearpay.
                </p>
              </div>

              {savings > 0 && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg shadow-xs">
                  Save £{savings} ({savingsPercent}% off)
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="mt-12 space-y-10">
            {/* ========================================================
                OPTION SECTION 1: STORAGE CAPACITY
               ======================================================== */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-colors grid lg:grid-cols-2 gap-6 lg:gap-10 ${
              isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Choose Your Storage Capacity
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">
                  Selected: {selectedStorage}
                </span>
              </div>

              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Select how much internal flash storage you need for apps, 4K photos, and system cache.
              </p>

              <div className={`rounded-2xl min-h-64 flex items-center justify-center p-8 lg:col-start-1 ${isDark ? 'bg-neutral-800/60' : 'bg-emerald-50'}`}><div className="text-center"><HardDrive className="w-20 h-20 text-emerald-500 mx-auto" /><p className={`mt-4 text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Choose the space that fits your digital life</p><p className="text-xs text-neutral-500 mt-1">Every capacity is tested for speed, health and reliability.</p></div></div>
              <div className="space-y-3 pt-1 lg:col-start-2 lg:row-start-1 lg:row-span-3">
                {product.storageOptions.map((opt) => {
                  const isSelected = selectedStorage === opt.size;
                  return (
                    <button
                      key={opt.size}
                      type="button"
                      onClick={() => setSelectedStorage(opt.size)}
                      className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? isDark
                            ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500 text-white'
                            : 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 text-neutral-900'
                          : isDark
                          ? 'border-neutral-800 bg-neutral-900 hover:border-neutral-700 text-neutral-300'
                          : 'border-neutral-200 bg-neutral-50/60 hover:border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <span className={`w-14 h-14 rounded-xl grid place-items-center shrink-0 ${isDark ? 'bg-neutral-800' : 'bg-white shadow-sm'}`}><HardDrive className="w-6 h-6 text-emerald-500" /></span><span className="flex-1"><span className="font-extrabold text-base font-mono block">{opt.size}</span><span className="text-[11px] text-neutral-500">Storage for apps, photos, downloads and project files</span></span>
                      <div className={`text-sm font-mono tabular-nums shrink-0 ${
                        isSelected ? 'text-emerald-600 font-bold' : 'text-neutral-500'
                      }`}>
                        {opt.priceDelta === 0 ? 'Base Price' : `+£${opt.priceDelta}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                OPTION SECTION 2: COSMETIC CONDITION GRADE
               ======================================================== */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-colors grid lg:grid-cols-2 gap-6 lg:gap-10 ${
              isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Choose Your Cosmetic Condition
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onOpenQualityGuide}
                  className="text-xs text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Condition guide</span>
                </button>
              </div>

              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                All grades are 100% technically operational with minimum 85% battery health. Only external cosmetics vary.
              </p>

              <div className={`rounded-2xl min-h-80 flex items-center justify-center p-8 lg:col-start-1 overflow-hidden ${isDark ? 'bg-neutral-800/60' : 'bg-violet-50'}`}><div className="text-center"><img src={product.image} alt={`${product.name} condition example`} className="max-h-56 mx-auto object-contain drop-shadow-2xl" /><p className={`mt-4 text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Realistic condition preview</p><p className="text-xs text-neutral-500 mt-1">Cosmetic grade changes appearance only. Every device remains fully functional.</p></div></div>
              <div className="space-y-3 pt-1 lg:col-start-2 lg:row-start-1 lg:row-span-3">
                {(['fair', 'good', 'excellent', 'premium'] as ConditionGrade[]).map((grade) => {
                  const isSelected = selectedCondition === grade;
                  const info = CONDITION_DETAILS[grade];
                  const gradePrice =
                    product.basePrice +
                    storageDelta +
                    Math.round(product.basePrice * (info.priceMultiplier - 1));

                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setSelectedCondition(grade)}
                      className={`w-full p-5 rounded-xl text-left border transition-all cursor-pointer relative ${
                        isSelected
                          ? isDark
                            ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500'
                            : 'border-emerald-500 bg-emerald-50/80 ring-1 ring-emerald-500'
                          : isDark
                          ? 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                          : 'border-neutral-200 bg-neutral-50/60 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className={`w-16 h-16 rounded-xl grid place-items-center shrink-0 ${isDark ? 'bg-neutral-800' : 'bg-white shadow-sm'}`}><img src={product.image} alt="" className="w-12 h-12 object-contain" /></span>
                        <span className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          {info.title}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-600 tabular-nums">
                          £{gradePrice}
                        </span>
                      </div>

                      <div className="text-[11px] space-y-1 mt-2">
                        <p className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                          <span className="font-semibold">Screen:</span> {info.screen}
                        </p>
                        <p className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
                          <span className="font-semibold">Body:</span> {info.body}
                        </p>
                        <p className="text-emerald-600 font-mono font-medium">
                          {info.battery}
                        </p>
                      </div>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                OPTION SECTION 3: COLOUR SELECTION
               ======================================================== */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-colors grid lg:grid-cols-2 gap-6 lg:gap-10 ${
              isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Choose Your Colour Finish
                  </h3>
                </div>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {selectedColor.label}
                </span>
              </div>

              <div className={`rounded-2xl min-h-64 flex items-center justify-center p-8 lg:col-start-1 ${isDark ? 'bg-neutral-800/60' : 'bg-sky-50'}`}><div className="text-center"><div className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-xl" style={{ backgroundColor: selectedColor.hex }} /><p className={`mt-4 text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{selectedColor.label}</p><p className="text-xs text-neutral-500 mt-1">Colour does not change the configured price.</p></div></div>
              <div className="space-y-3 pt-1 lg:col-start-2 lg:row-start-1 lg:row-span-2">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`group w-full flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'border-emerald-500 bg-neutral-900 ring-1 ring-emerald-500 text-white'
                            : 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 text-neutral-900'
                          : isDark
                          ? 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 text-neutral-300'
                          : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <span
                        className="w-14 h-14 rounded-xl border border-neutral-300 dark:border-neutral-600 shadow-inner shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="flex-1 text-left"><strong className="text-sm block">{color.name}</strong><small className="text-neutral-500">Factory-matched finish in the selected condition</small></span><span className="text-sm font-mono font-bold text-emerald-600">Included</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                OPTION SECTION 4: BATTERY CONDITION
               ======================================================== */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-colors grid lg:grid-cols-2 gap-6 lg:gap-10 ${
              isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Battery Condition Package
                  </h3>
                </div>
                <BatteryCharging className="w-4 h-4 text-emerald-500" />
              </div>

              <div className={`rounded-2xl min-h-64 flex items-center justify-center p-8 lg:col-start-1 ${isDark ? 'bg-neutral-800/60' : 'bg-amber-50'}`}><div className="text-center"><BatteryCharging className="w-20 h-20 text-emerald-500 mx-auto" /><p className={`mt-4 text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Power that matches your routine</p><p className="text-xs text-neutral-500 mt-1">Choose certified everyday capacity or a fresh zero-cycle battery.</p></div></div>
              <div className="space-y-3 pt-1 lg:col-start-2 lg:row-start-1 lg:row-span-2">
                <button
                  type="button"
                  onClick={() => setSelectedBattery('standard')}
                  className={`w-full p-5 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-4 ${
                    selectedBattery === 'standard'
                      ? isDark
                        ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                      : isDark
                      ? 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                      : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  <span className={`w-14 h-14 rounded-xl grid place-items-center shrink-0 ${isDark ? 'bg-neutral-800' : 'bg-white shadow-sm'}`}><Battery className="w-6 h-6 text-emerald-500" /></span><div className="flex-1"><div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Standard Certified Battery
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-600">Included</span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Tested to have $\ge 85\%$ minimum battery health capacity. Guaranteed for all-day usage.
                  </p></div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBattery('brand_new')}
                  className={`w-full p-5 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-4 ${
                    selectedBattery === 'brand_new'
                      ? isDark
                        ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                      : isDark
                      ? 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                      : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  <span className={`w-14 h-14 rounded-xl grid place-items-center shrink-0 ${isDark ? 'bg-neutral-800' : 'bg-white shadow-sm'}`}><BatteryCharging className="w-6 h-6 text-emerald-500" /></span><div className="flex-1"><div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      100% Brand-New Battery
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600">+£39</span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Fitted with a fresh, zero-cycle battery tested by certified electronics technicians.
                  </p></div>
                </button>
              </div>
            </div>

            {/* ========================================================
                OPTION SECTION 5: WARRANTY & PROTECTION
               ======================================================== */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-colors grid lg:grid-cols-2 gap-6 lg:gap-10 ${
              isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Commercial Warranty & Care Plan
                  </h3>
                </div>
                <Shield className="w-4 h-4 text-emerald-500" />
              </div>

              <div className={`rounded-2xl min-h-64 flex items-center justify-center p-8 lg:col-start-1 ${isDark ? 'bg-neutral-800/60' : 'bg-blue-50'}`}><div className="text-center"><Shield className="w-20 h-20 text-emerald-500 mx-auto" /><p className={`mt-4 text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Protection beyond delivery day</p><p className="text-xs text-neutral-500 mt-1">Select the cover period and protection level that feels right.</p></div></div>
              <div className="space-y-2.5 pt-1 lg:col-start-2 lg:row-start-1 lg:row-span-2">
                {[
                  {
                    id: '12_months',
                    title: '12 Months ABC Tech Commercial Warranty',
                    price: 'Included Free',
                    desc: 'Full coverage for technical faults, touch screen failure, and motherboard defects.',
                  },
                  {
                    id: '24_months',
                    title: '24 Months Extended Commercial Warranty (+£49)',
                    price: '+£49',
                    desc: 'Double your peace of mind with 2 full years of priority repair or device replacement.',
                  },
                  {
                    id: '36_months',
                    title: '36 Months Complete Care + Accidental Protection (+£89)',
                    price: '+£89',
                    desc: '3-year comprehensive protection including drops, screen cracks, and liquid damage.',
                  },
                ].map((plan) => {
                  const isSelected = selectedWarranty === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedWarranty(plan.id as WarrantyDuration)}
                      className={`w-full p-5 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? isDark
                            ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500'
                            : 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                          : isDark
                          ? 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                          : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                      }`}
                    >
                      <span className={`w-14 h-14 rounded-xl grid place-items-center shrink-0 ${isDark ? 'bg-neutral-800' : 'bg-white shadow-sm'}`}><Shield className="w-6 h-6 text-emerald-500" /></span><div className="flex-1">
                        <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          {plan.title}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {plan.desc}
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 ml-3 shrink-0">
                        {plan.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                OPTION SECTION 6: NETWORK & SIM STATUS
               ======================================================== */}
            <div className={`p-4 rounded-2xl border transition-colors flex items-center justify-between text-xs ${
              isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-emerald-500" />
                <div>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    100% Unlocked SIM-Free
                  </span>
                  <p className={isDark ? 'text-neutral-400 text-[11px]' : 'text-neutral-500 text-[11px]'}>
                    Compatible with EE, Vodafone, O2, Three, giffgaff & global eSIM
                  </p>
                </div>
              </div>
              <span className="text-emerald-600 font-mono font-bold text-[11px]">Any Carrier</span>
            </div>

            {/* ========================================================
                PURCHASE ACTION BUTTON & STOCK PROMISE
               ======================================================== */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleBuyClick}
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-base text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-emerald-500/25"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Bag · £{currentRefurbPrice}</span>
              </button>

              {addedToast && (
                <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-xl text-center text-xs font-semibold animate-in fade-in duration-200">
                  ✓ Configured device added to your bag!
                </div>
              )}

              <button
                type="button"
                onClick={onOpenTradeIn}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 border ${
                  isDark
                    ? 'bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border-neutral-800'
                    : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200 shadow-xs'
                }`}
              >
                <span>Have an old device? Trade it in for up to £250 voucher</span>
              </button>
            </div>

            {/* Trust Reassurance Strip */}
            <div className={`grid grid-cols-2 gap-3 pt-4 border-t text-xs ${
              isDark ? 'border-neutral-900 text-neutral-400' : 'border-neutral-200 text-neutral-600'
            }`}>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Free tracked UK delivery (DPD 24h)</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>12-month commercial warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Cable & SIM ejector in box</span>
              </div>
            </div>
          </div>

        {/* 25-Point Diagnostic Audit */}
        <div className={`mt-16 pt-12 border-t ${
          isDark ? 'border-neutral-900' : 'border-neutral-200'
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                25-Point UK Hardware Inspection
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Every unit is disinfected, bench-tested, and certified by vetted electronics technicians.
              </p>
            </div>
            <button
              onClick={onOpenInspection}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Diagnostic Protocols</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TECHNICAL_INSPECTION_POINTS.slice(0, 6).map((point) => (
              <div
                key={point.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                  isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
                }`}
              >
                <div>
                  <span className={`text-[10px] uppercase tracking-wider font-mono ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    {point.category}
                  </span>
                  <p className={`font-semibold mt-0.5 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                    {point.name}
                  </p>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {point.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className={`mt-16 pt-12 border-t ${
          isDark ? 'border-neutral-900' : 'border-neutral-200'
        }`}>
          <h2 className={`text-xl sm:text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Detailed Technical Specifications
          </h2>
          <div className={`border rounded-2xl overflow-hidden divide-y text-xs ${
            isDark ? 'bg-neutral-900/50 border-neutral-800 divide-neutral-800' : 'bg-white border-neutral-200 divide-neutral-200 shadow-xs'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4">
              <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Display Matrix</span>
              <span className={`md:col-span-2 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{product.specs.screen} ({product.specs.screenSize})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4">
              <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Processor & Architecture</span>
              <span className={`md:col-span-2 font-mono ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{product.specs.chipset}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4">
              <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Memory & Storage</span>
              <span className={`md:col-span-2 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{product.specs.ram} RAM · Available in {product.storageOptions.map(s => s.size).join(', ')}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4">
              <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Camera System</span>
              <span className={`md:col-span-2 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>Rear: {product.specs.rearCamera} · Front: {product.specs.frontCamera}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4">
              <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Battery Endurance</span>
              <span className={`md:col-span-2 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{product.specs.batteryLife}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4">
              <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Dimensions & Weight</span>
              <span className={`md:col-span-2 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{product.specs.weight}</span>
            </div>
          </div>
        </div>

        {/* Customer Verified Reviews */}
        <div className={`mt-16 pt-12 border-t ${
          isDark ? 'border-neutral-900' : 'border-neutral-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Verified Customer Reviews
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Unboxing ratings from buyers who purchased this refurbished device.
              </p>
            </div>
            <div className={`flex items-center gap-1.5 text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{product.rating} / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VERIFIED_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className={`border rounded-2xl p-5 space-y-3 ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className={`font-mono text-[11px] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    {rev.date}
                  </span>
                </div>
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {rev.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {rev.content}
                </p>
                <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                  isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-500'
                }`}>
                  <span className="font-medium">{rev.author}</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Refurb
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
