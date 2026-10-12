import React from 'react';
import { X, ShieldCheck, Check, Sparkles, Smartphone, Battery, Cpu } from 'lucide-react';
import { CONDITION_DETAILS } from '../data/products';
import { ConditionGrade } from '../types';

interface QualityGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QualityGuideModal: React.FC<QualityGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                ABC Tech Cosmetic Condition Standards
              </h3>
              <p className="text-xs text-neutral-400">
                100% verified technical performance across all grades. Only aesthetics differ.
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

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Universal Guarantee Banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Factory Restored & Unlocked</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <Battery className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>85%+ Certified Battery Health</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>12-Month Commercial Warranty</span>
            </div>
          </div>

          {/* 4 Condition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['premium', 'excellent', 'good', 'fair'] as ConditionGrade[]).map((grade) => {
              const info = CONDITION_DETAILS[grade];
              return (
                <div
                  key={grade}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-white">{info.title}</span>
                      <span className="text-xs text-emerald-400 ml-2 font-mono">
                        ({info.badgeLabel})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">{info.description}</p>

                  <div className="space-y-2 pt-2 border-t border-neutral-800/80 text-xs">
                    <div>
                      <span className="font-semibold text-neutral-400 text-[11px] uppercase tracking-wider block">
                        Screen Glass:
                      </span>
                      <span className="text-neutral-200 text-xs">{info.screen}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-neutral-400 text-[11px] uppercase tracking-wider block">
                        Body / Frame / Back:
                      </span>
                      <span className="text-neutral-200 text-xs">{info.body}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-neutral-400 text-[11px] uppercase tracking-wider block">
                        Battery Health Minimum:
                      </span>
                      <span className="text-emerald-400 text-xs font-mono">{info.battery}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* In the Box Guarantee */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 space-y-1">
            <h5 className="font-semibold text-white">What arrives in the box?</h5>
            <p>
              Your refurbished device arrives in high-density recycled packaging with a brand-new MFi / USB-IF certified charging cable and SIM tray ejector tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
