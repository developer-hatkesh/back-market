import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Filter, Search } from 'lucide-react';
import { TECHNICAL_INSPECTION_POINTS } from '../data/products';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const categories = [
    'All',
    ...Array.from(new Set(TECHNICAL_INSPECTION_POINTS.map((p) => p.category))),
  ];

  const filteredPoints = TECHNICAL_INSPECTION_POINTS.filter((p) => {
    const matchCat = selectedCat === 'All' || p.category === selectedCat;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                25-Point UK Refurbishment Audit
              </h3>
              <p className="text-xs text-neutral-400">
                Independent diagnostic checklist executed on every refurbished device prior to dispatch.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 sm:p-6 pb-2 border-b border-neutral-800/80 bg-neutral-900/20 shrink-0 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 font-medium ${
                  selectedCat === c
                    ? 'bg-emerald-400 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search test criteria (e.g., Face ID, Battery, Camera)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredPoints.map((pt) => (
              <div
                key={pt.id}
                className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">
                    Point #{pt.id} · {pt.category}
                  </span>
                  <p className="font-semibold text-neutral-200 mt-0.5">{pt.name}</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-[11px] bg-emerald-950/70 border border-emerald-900 px-2 py-1 rounded-md shrink-0 ml-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{pt.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
