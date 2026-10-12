import React from 'react';
import { ArrowUpRight, BatteryCharging, Recycle, ShieldCheck } from 'lucide-react';

interface EditorialSectionProps { isDark: boolean; onOpenQualityGuide: () => void; }
const stories = [
  { label: 'Buying guide', title: 'Fair, good or excellent: which grade is right for you?', copy: 'A plain-English guide to cosmetic condition, battery standards and where the smart money goes.', icon: ShieldCheck, tone: 'from-violet-500/20 to-fuchsia-500/5' },
  { label: 'Care studio', title: 'Five habits that make your phone battery last longer', copy: 'Small charging and temperature changes that can keep a refurbished device feeling fresh.', icon: BatteryCharging, tone: 'from-amber-400/25 to-orange-500/5' },
  { label: 'Circular tech', title: 'What actually happens during refurbishment?', copy: 'From secure data erasure to diagnostics and final grading, follow a device through the workshop.', icon: Recycle, tone: 'from-emerald-400/25 to-cyan-500/5' },
];
export const EditorialSection: React.FC<EditorialSectionProps> = ({ isDark, onOpenQualityGuide }) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
    <div className="flex items-end justify-between gap-6 mb-7"><div><p className="text-xs font-extrabold tracking-[0.18em] uppercase text-emerald-600 mb-2">The ABC Tech Journal</p><h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-neutral-950'}`}>Better tech starts with better information.</h2></div><button onClick={onOpenQualityGuide} className="hidden sm:flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-500">Read the condition guide <ArrowUpRight className="w-4 h-4" /></button></div>
    <div className="grid md:grid-cols-3 gap-4">{stories.map(({ label, title, copy, icon: Icon, tone }) => <article key={title} className={`group rounded-[1.75rem] border overflow-hidden ${isDark ? 'bg-neutral-900/70 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}><div className={`h-36 bg-gradient-to-br ${tone} p-6 flex items-end`}><div className={`w-12 h-12 rounded-2xl grid place-items-center border ${isDark ? 'bg-neutral-950 border-neutral-800 text-emerald-400' : 'bg-white border-white text-emerald-700 shadow-sm'}`}><Icon className="w-6 h-6" /></div></div><div className="p-6"><p className="text-[11px] uppercase tracking-[0.16em] font-extrabold text-emerald-600">{label}</p><h3 className={`mt-2 text-lg font-extrabold leading-snug ${isDark ? 'text-white' : 'text-neutral-950'}`}>{title}</h3><p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{copy}</p><button onClick={onOpenQualityGuide} className={`mt-5 inline-flex items-center gap-2 text-xs font-bold ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>Explore story <ArrowUpRight className="w-3.5 h-3.5" /></button></div></article>)}</div>
  </section>
);
