import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, FilterState, ConditionGrade, StorageOption } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HomeHeroSlider } from './components/HomeHeroSlider';
import { CategoryNavGrid } from './components/CategoryNavGrid';
import { ProductSliderSection } from './components/ProductSliderSection';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ComparisonModal } from './components/ComparisonModal';
import { FloatingCompareBar } from './components/FloatingCompareBar';
import { CartDrawer } from './components/CartDrawer';
import { TradeInModal } from './components/TradeInModal';
import { QualityGuideModal } from './components/QualityGuideModal';
import { InspectionModal } from './components/InspectionModal';
import { Footer } from './components/Footer';
import { EditorialSection } from './components/EditorialSection';
import { CategoryPage } from './components/CategoryPage';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function App() {
  // Theme state: default to clean crisp lighter version as requested, toggleable anytime!
  const [isDark, setIsDark] = useState<boolean>(false);

  // Navigation & View state
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'pdp'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tradeInDiscount, setTradeInDiscount] = useState(0);

  // Comparison state
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Modals
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isQualityGuideOpen, setIsQualityGuideOpen] = useState(false);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Search state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brands: [],
    categories: [],
    conditions: [],
    warranty: [],
    priceRange: [0, 2000],
    storage: [],
    sortBy: 'featured',
  });

  // Active category shortcut
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const syncFromUrl = () => {
      const match = window.location.pathname.match(/^\/products\/([^/]+)$/);
      const categoryMatch = window.location.pathname.match(/^\/category\/([^/]+)$/);
      if (match) {
        const product = PRODUCTS.find((item) => item.slug === decodeURIComponent(match[1]));
        if (product) { setSelectedProduct(product); setCurrentView('pdp'); }
      } else if (categoryMatch) {
        setActiveCategory(decodeURIComponent(categoryMatch[1])); setSelectedProduct(null); setCurrentView('category');
      } else { setSelectedProduct(null); setCurrentView('home'); }
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Search text
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesTagline = item.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesTagline) return false;
      }

      // Quick Category Tab
      if (activeCategory !== 'all') {
        if (item.category !== activeCategory) return false;
      }

      // Sidebar Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(item.brand)) {
        return false;
      }

      // Sidebar Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }

      // Sidebar Condition filter
      if (filters.conditions.length > 0 && !filters.conditions.includes(item.defaultCondition)) {
        return false;
      }

      // Price range filter
      if (
        item.basePrice < filters.priceRange[0] ||
        item.basePrice > filters.priceRange[1]
      ) {
        return false;
      }

      // Storage filter
      if (filters.storage.length > 0) {
        const hasStorage = item.storageOptions.some((s) =>
          filters.storage.includes(s.size)
        );
        if (!hasStorage) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (filters.sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (filters.sortBy === 'savings') {
        const savA = a.priceNew - a.basePrice;
        const savB = b.priceNew - b.basePrice;
        return savB - savA;
      }
      if (filters.sortBy === 'co2') return b.co2SavedKg - a.co2SavedKg;
      return 0; // featured default
    });
  }, [filters, activeCategory]);

  // Merchandising Collections for Category Sliders
  const smartphoneBestsellers = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'smartphones'),
    []
  );

  const laptopCollection = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'laptops'),
    []
  );

  const budgetFriendlyDeals = useMemo(
    () => PRODUCTS.filter((p) => p.basePrice <= 650),
    []
  );

  // Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.history.pushState({}, '', `/products/${product.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductBySlug = (slug: string) => {
    const found = PRODUCTS.find((p) => p.slug === slug);
    if (found) {
      handleSelectProduct(found);
    }
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCategory = (category: string) => {
    setActiveCategory(category);
    setSelectedProduct(null);
    setCurrentView('category');
    window.history.pushState({}, '', `/category/${category}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (product: Product) => {
    if (comparedProducts.some((p) => p.id === product.id)) {
      setComparedProducts(comparedProducts.filter((p) => p.id !== product.id));
    } else {
      if (comparedProducts.length >= 4) {
        alert('You can compare up to 4 devices simultaneously.');
        return;
      }
      setComparedProducts([...comparedProducts, product]);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setComparedProducts(comparedProducts.filter((p) => p.id !== id));
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
  };

  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const existingIndex = cart.findIndex(
      (c) =>
        c.productId === item.productId &&
        c.selectedStorage === item.selectedStorage &&
        c.selectedCondition === item.selectedCondition &&
        c.selectedColor.name === item.selectedColor.name &&
        c.selectedBattery === item.selectedBattery &&
        c.selectedWarranty === item.selectedWarranty
    );

    if (existingIndex > -1) {
      const nextCart = [...cart];
      nextCart[existingIndex].quantity += 1;
      setCart(nextCart);
    } else {
      const newCartItem: CartItem = {
        ...item,
        id: `${item.productId}-${Date.now()}`,
      };
      setCart([...cart, newCartItem]);
    }

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      brands: [],
      categories: [],
      conditions: [],
      warranty: [],
      priceRange: [0, 2000],
      storage: [],
      sortBy: 'featured',
    });
    setActiveCategory('all');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-black ${
      isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50/60 text-neutral-900'
    }`}>
      {/* Universal Top Navigation */}
      <Navbar
        cart={cart}
        comparedProducts={comparedProducts}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onOpenQualityGuide={() => setIsQualityGuideOpen(true)}
        onSelectCategory={handleOpenCategory}
        activeCategory={activeCategory}
        onGoHome={handleGoHome}
        searchTerm={filters.search}
        onSearchChange={(q) => setFilters({ ...filters, search: q })}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentView === 'pdp' && selectedProduct ? (
          <ProductDetailPage
            key={selectedProduct.id}
            product={selectedProduct}
            onBack={handleGoHome}
            onAddToCart={handleAddToCart}
            onToggleCompare={handleToggleCompare}
            isCompared={comparedProducts.some((p) => p.id === selectedProduct.id)}
            onOpenTradeIn={() => setIsTradeInOpen(true)}
            onOpenQualityGuide={() => setIsQualityGuideOpen(true)}
            onOpenInspection={() => setIsInspectionOpen(true)}
            isDark={isDark}
          />
        ) : currentView === 'category' ? (
          <CategoryPage
            category={activeCategory}
            products={filteredProducts}
            isDark={isDark}
            comparedProducts={comparedProducts}
            onBack={handleGoHome}
            onSelectProduct={handleSelectProduct}
            onToggleCompare={handleToggleCompare}
          />
        ) : (
          /* Catalog & Landing Page View */
          <>
            {/* 1. Interactive Landing Page Hero Slider (Autoplay + Controls) */}
            <HomeHeroSlider
              onExploreCategory={handleOpenCategory}
              onOpenTradeIn={() => setIsTradeInOpen(true)}
              onSelectProductBySlug={handleSelectProductBySlug}
              isDark={isDark}
            />

            {/* 2. Visual Category Navigation Grid */}
            <CategoryNavGrid
              onSelectCategory={handleOpenCategory}
              activeCategory={activeCategory}
              onOpenTradeIn={() => setIsTradeInOpen(true)}
              isDark={isDark}
            />

            {/* 3. Merchandising Slider 1: Best Sellers in Smartphones */}
            <ProductSliderSection
              title="Flagship Smartphones"
              subtitle="Refurbished iPhone 16, Samsung Galaxy S24 Ultra & Google Pixel 9 Pro."
              products={smartphoneBestsellers}
              onSelectProduct={handleSelectProduct}
              comparedProducts={comparedProducts}
              onToggleCompare={handleToggleCompare}
              onViewAll={() => {
                handleOpenCategory('smartphones');
              }}
              isDark={isDark}
            />

            <EditorialSection isDark={isDark} onOpenQualityGuide={() => setIsQualityGuideOpen(true)} />

            {/* 4. Merchandising Slider 2: MacBook Atelier */}
            <ProductSliderSection
              title="The Laptop Edit — Pro Performance"
              subtitle="Retina XDR displays and M3 architecture. Inspected and guaranteed."
              products={laptopCollection}
              onSelectProduct={handleSelectProduct}
              comparedProducts={comparedProducts}
              onToggleCompare={handleToggleCompare}
              onViewAll={() => {
                handleOpenCategory('laptops');
              }}
              isDark={isDark}
            />

            {/* 5. Merchandising Slider 3: High-Value Deals Under £650 */}
            <ProductSliderSection
              title="Refurbished Deals Under £650"
              subtitle="Premium flagships at accessible pricing with 100% verified battery health."
              products={budgetFriendlyDeals}
              onSelectProduct={handleSelectProduct}
              comparedProducts={comparedProducts}
              onToggleCompare={handleToggleCompare}
              isDark={isDark}
            />

            {/* The full catalogue now lives on dedicated category routes. */}
            {false && (
            <div id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              {/* Controls bar: Results count, active filters, sorting */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
                isDark ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div>
                  <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                    isDark ? 'text-white' : 'text-neutral-950'
                  }`}>
                    {activeCategory === 'smartphones'
                      ? 'Refurbished Flagship Smartphones'
                      : activeCategory === 'laptops'
                      ? 'Refurbished Apple MacBooks'
                      : activeCategory === 'tablets'
                      ? 'Refurbished iPads & Tablets'
                      : 'All Refurbished Tech'}
                  </h2>
                  <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Showing <span className="font-bold">{filteredProducts.length}</span> verified devices in stock · 12m commercial warranty included
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Trigger Button */}
                  <button
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className={`lg:hidden px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                      isDark
                        ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                        : 'bg-white border-neutral-200 text-neutral-800 shadow-xs'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Filters</span>
                  </button>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          sortBy: e.target.value as FilterState['sortBy'],
                        })
                      }
                      className={`border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer ${
                        isDark
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                          : 'bg-white border-neutral-200 text-neutral-800 shadow-xs'
                      }`}
                    >
                      <option value="featured">Best Matches</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="savings">Biggest Savings (£)</option>
                      <option value="co2">Highest CO₂ Saved</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mobile Filter Drawer */}
              {mobileFilterOpen && (
                <div className="lg:hidden my-4">
                  <FilterSidebar
                    filters={filters}
                    onChange={setFilters}
                    onReset={handleResetFilters}
                    totalResults={filteredProducts.length}
                    isDark={isDark}
                  />
                </div>
              )}

              {/* Main Content Layout (Sidebar + Products Grid) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                {/* Desktop Left Sidebar: Clear Filters (Warranty, Price, Brand, Condition) */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start">
                  <FilterSidebar
                    filters={filters}
                    onChange={setFilters}
                    onReset={handleResetFilters}
                    totalResults={filteredProducts.length}
                    isDark={isDark}
                  />
                </aside>

                {/* Right Product Grid */}
                <div className="lg:col-span-9">
                  {filteredProducts.length === 0 ? (
                    <div className={`text-center py-20 rounded-3xl border p-8 space-y-4 ${
                      isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
                    }`}>
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mx-auto ${
                        isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-500' : 'bg-neutral-100 border-neutral-200 text-neutral-400'
                      }`}>
                        <Search className="w-6 h-6" />
                      </div>
                      <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        No refurbished devices match
                      </h4>
                      <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        Try loosening your price limits or warranty filter to explore more gadgets.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer ${
                          isDark
                            ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                        }`}
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onSelectProduct={handleSelectProduct}
                          isCompared={comparedProducts.some((p) => p.id === product.id)}
                          onToggleCompare={handleToggleCompare}
                          isDark={isDark}
                        />
                      ))}
                    </div>
                  )}

                  {/* Refurbished Quality Assurance Strip */}
                  <div className={`mt-14 p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
                    isDark
                      ? 'bg-neutral-900/70 border-neutral-800'
                      : 'bg-white border-neutral-200 shadow-xs'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-neutral-950 flex items-center justify-center font-bold shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          ABC Tech Quality Guarantee
                        </h4>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Every unit undergoes a strict 25-point hardware diagnostic test and includes a minimum 12-month commercial warranty with 30-day money-back guarantee.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsInspectionOpen(true)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer shrink-0 border ${
                        isDark
                          ? 'text-emerald-400 bg-emerald-950/80 border-emerald-800 hover:bg-emerald-900/80'
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      View 25-Point Checklist
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </>
        )}
      </main>

      {/* Floating Comparison Tray (Persists when items are selected) */}
      <FloatingCompareBar
        comparedProducts={comparedProducts}
        onOpenCompare={() => setIsCompareOpen(true)}
        onRemoveProduct={handleRemoveCompare}
        onClearAll={handleClearCompare}
      />

      {/* Side-by-Side Comparison Fullscreen Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveProduct={handleRemoveCompare}
        onClearAll={handleClearCompare}
        onSelectProduct={handleSelectProduct}
        allProducts={PRODUCTS}
        onAddProduct={handleToggleCompare}
      />

      {/* Shopping Bag Drawer & Simulated Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        tradeInDiscount={tradeInDiscount}
      />

      {/* Trade-In Valuation Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        onApplyVoucher={(amount) => {
          setTradeInDiscount(amount);
          setIsCartOpen(true);
        }}
      />

      {/* Condition Standards Guide Modal */}
      <QualityGuideModal
        isOpen={isQualityGuideOpen}
        onClose={() => setIsQualityGuideOpen(false)}
      />

      {/* 25-Point Inspection Protocol Modal */}
      <InspectionModal
        isOpen={isInspectionOpen}
        onClose={() => setIsInspectionOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onOpenQualityGuide={() => setIsQualityGuideOpen(true)}
        onSelectCategory={handleOpenCategory}
        isDark={isDark}
      />
    </div>
  );
}
