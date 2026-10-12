export type ConditionGrade = 'fair' | 'good' | 'excellent' | 'premium';

export type StorageOption = '128GB' | '256GB' | '512GB' | '1TB' | '2TB';

export type WarrantyDuration = '12_months' | '24_months' | '36_months';

export type BatteryHealthTier = 'standard' | 'brand_new';

export interface ColorOption {
  name: string;
  hex: string;
  label: string;
}

export interface TechnicalSpecs {
  screen: string;
  screenSize: string;
  resolution: string;
  chipset: string;
  ram: string;
  rearCamera: string;
  frontCamera: string;
  batteryLife: string;
  weight: string;
  os: string;
  connectivity: string;
  waterResistance: string;
  releaseYear: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google';
  category: 'smartphones' | 'laptops' | 'tablets' | 'wearables';
  tagline: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  basePrice: number; // Base refurbished price for lowest storage & fair condition
  priceNew: number; // Original retail price
  co2SavedKg: number;
  eWasteSavedGrams: number;
  storageOptions: {
    size: StorageOption;
    priceDelta: number;
  }[];
  colors: ColorOption[];
  defaultCondition: ConditionGrade;
  specs: TechnicalSpecs;
  keyFeatures: string[];
  inStock: boolean;
  warrantyDefaultMonths: number;
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  product: Product;
  selectedColor: ColorOption;
  selectedStorage: StorageOption;
  selectedCondition: ConditionGrade;
  selectedBattery: BatteryHealthTier;
  selectedWarranty: WarrantyDuration;
  price: number;
  quantity: number;
}

export interface FilterState {
  search: string;
  brands: string[];
  categories: string[];
  conditions: ConditionGrade[];
  warranty: string[];
  priceRange: [number, number];
  storage: StorageOption[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'savings' | 'co2';
}
