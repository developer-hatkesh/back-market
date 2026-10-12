import React from 'react';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

const categoryCopy: Record<string, { title: string; eyebrow: string; description: string; image: string }> = {
  all: { title: 'All refurbished tech', eyebrow: 'The complete collection', description: 'Every inspected device in one place. Compare condition, capacity and price to find your fit.', image: '/src/assets/images/hero_refurbished_flagship_1791795384385.jpg' },
  smartphones: { title: 'Refurbished smartphones', eyebrow: 'Pocket-sized power', description: 'Flagship iPhone, Galaxy and Pixel devices, unlocked and tested across our full inspection checklist.', image: '/src/assets/images/product_iphone16_showcase_1791795395569.jpg' },
  laptops: { title: 'Refurbished laptops', eyebrow: 'Work without compromise', description: 'Portable performance for focused work, creative projects and everything between.', image: '/src/assets/images/product_macbook_pro_showcase_1791795407981.jpg' },
  tablets: { title: 'Refurbished tablets', eyebrow: 'A canvas for anything', description: 'Flexible screens for drawing, streaming, reading and work on the move.', image: '/src/assets/images/product_macbook_pro_showcase_1791795407981.jpg' },
  wearables: { title: 'Refurbished smartwatches', eyebrow: 'Technology in step', description: 'Fitness, navigation and notifications from fully tested wearable devices.', image: '/src/assets/images/hero_refurbished_flagship_1791795384385.jpg' },
};

interface Props { category: string; products: Product[]; isDark: boolean; comparedProducts: Product[]; onBack: () => void; onSelectProduct: (product: Product) => void; onToggleCompare: (product: Product) => void; }

export const CategoryPage: React.FC<Props> = ({ category, products, isDark, comparedProducts, onBack, onSelectProduct, onToggleCompare }) => {
  const content = categoryCopy[category] || categoryCopy.all;
  return <div className={isDark ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-950'}>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8"><button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 mb-6"><ArrowLeft className="w-4 h-4" /> Back to home</button><div className={`overflow-hidden rounded-[2rem] border min-h-[300px] grid lg:grid-cols-2 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}><div className="p-8 sm:p-12 flex flex-col justify-center"><p className="text-xs font-black uppercase tracking-[.18em] text-emerald-600">{content.eyebrow}</p><h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">{content.title}</h1><p className={`mt-4 max-w-xl leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{content.description}</p><div className="mt-6 flex items-center gap-2 text-sm font-bold"><SlidersHorizontal className="w-4 h-4 text-emerald-500" /> {products.length} products ready to configure</div></div><div className={`min-h-64 flex items-center justify-center p-8 ${isDark ? 'bg-neutral-800/50' : 'bg-emerald-50'}`}><img src={content.image} alt="" className="max-h-64 object-contain drop-shadow-2xl" /></div></div></section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14"><div className="mb-7"><p className="text-xs font-bold text-emerald-600">CURATED STOCK</p><h2 className="text-2xl font-black mt-1">Choose your next device</h2></div>{products.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{products.map(product => <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} isCompared={comparedProducts.some(p => p.id === product.id)} onToggleCompare={onToggleCompare} isDark={isDark} />)}</div> : <div className={`rounded-3xl border p-14 text-center ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}><h3 className="font-bold">More devices are being inspected</h3><p className="text-sm text-neutral-500 mt-2">Fresh stock will appear here soon.</p></div>}</section>
  </div>;
};
