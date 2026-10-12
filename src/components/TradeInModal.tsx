import React, { useState } from 'react';
import { X, RefreshCcw, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyVoucher: (amount: number) => void;
}

export const TradeInModal: React.FC<TradeInModalProps> = ({
  isOpen,
  onClose,
  onApplyVoucher,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('iPhone 14');
  const [condition, setCondition] = useState('working');
  const [voucherApplied, setVoucherApplied] = useState(false);

  if (!isOpen) return null;

  const calculateEstimate = () => {
    let base = 120;
    if (brand === 'Apple') base = 210;
    if (brand === 'Samsung') base = 160;
    if (brand === 'Google') base = 140;

    if (condition === 'flawless') return base + 80;
    if (condition === 'working') return base;
    return Math.round(base * 0.45);
  };

  const estimatedValue = calculateEstimate();

  const handleApplyVoucher = () => {
    onApplyVoucher(estimatedValue);
    setVoucherApplied(true);
    setTimeout(() => {
      onClose();
      setVoucherApplied(false);
      setStep(1);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-2.5">
            <RefreshCcw className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">ABC Tech Trade-In</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">Step 1 of 3</span>
                <h4 className="text-lg font-bold text-white mt-1">Select your old device brand</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  We accept fully functional or cosmetically worn smartphones and laptops.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['Apple', 'Samsung', 'Google'].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setBrand(b);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                      brand === b
                        ? 'border-emerald-400 bg-emerald-950/40 text-white ring-1 ring-emerald-400'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Step 2 of 3</span>
                  <h4 className="text-lg font-bold text-white mt-1">Select model family</h4>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Change brand
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {(brand === 'Apple'
                  ? ['iPhone 15', 'iPhone 14', 'iPhone 13', 'MacBook Air M1']
                  : brand === 'Samsung'
                  ? ['Galaxy S23', 'Galaxy S22', 'Galaxy Z Flip 5', 'Galaxy S21']
                  : ['Pixel 8', 'Pixel 7 Pro', 'Pixel 7a', 'Pixel 6']
                ).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setModel(m);
                      setStep(3);
                    }}
                    className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs font-semibold text-neutral-200 hover:border-emerald-400 text-left transition-colors cursor-pointer"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Step 3 of 3</span>
                  <h4 className="text-lg font-bold text-white mt-1">What is the condition?</h4>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Change model
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'flawless', title: 'Flawless', desc: 'No visible scratches, works 100%' },
                  { id: 'working', title: 'Good / Normal Wear', desc: 'Light scratches on chassis or screen, fully operational' },
                  { id: 'cracked', title: 'Cracked or Defective', desc: 'Cracked glass or non-working camera/battery' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCondition(c.id);
                      setStep(4);
                    }}
                    className="w-full p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 text-left hover:border-emerald-400 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-neutral-400">{c.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center mx-auto text-emerald-400">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Guaranteed ABC Tech Trade-In Value
                </p>
                <div className="text-4xl font-extrabold text-emerald-400 font-mono mt-1">
                  £{estimatedValue}
                </div>
                <p className="text-xs text-neutral-300 mt-2">
                  For your <span className="font-semibold text-white">{brand} {model}</span> ({condition}).
                </p>
              </div>

              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-left text-xs text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-200 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free prepaid shipping kit sent to your door</span>
                </div>
                <p className="text-[11px]">
                  Apply now as an instant voucher toward your refurbished cart purchase today.
                </p>
              </div>

              {voucherApplied ? (
                <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-xl text-xs font-bold">
                  ✓ £{estimatedValue} Voucher Applied to Bag!
                </div>
              ) : (
                <button
                  onClick={handleApplyVoucher}
                  className="w-full py-3.5 rounded-xl bg-emerald-400 text-neutral-950 font-extrabold text-xs hover:bg-emerald-300 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Apply £{estimatedValue} Instant Credit to Order
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
