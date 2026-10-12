import React, { useState } from 'react';
import { CartItem } from '../types';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Truck,
  CreditCard,
  Lock,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  tradeInDiscount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  tradeInDiscount,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoDiscount, setAppliedPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Checkout form
  const [shippingForm, setShippingForm] = useState({
    name: 'Alex Harrison',
    email: 'alex.harrison@example.co.uk',
    address: '14 Kensington Church Street',
    city: 'London',
    postcode: 'W8 4EP',
  });

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = Math.max(0, rawSubtotal - tradeInDiscount - appliedPromoDiscount);
  const totalCo2Saved = cart.reduce((sum, item) => sum + item.product.co2SavedKg * item.quantity, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ATELIER20' || promoCode.trim().toUpperCase() === 'BACKMARKET') {
      setAppliedPromoDiscount(20);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "ATELIER20" for £20 off.');
    }
  };

  const handleFinishCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
  };

  const handleResetOrder = () => {
    onClearCart();
    setOrderComplete(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-neutral-950 border-l border-neutral-800 h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Your Shopping Bag</h3>
            <span className="text-xs font-mono font-medium text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {orderComplete ? (
          <div className="p-8 flex-grow flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-white">Order Confirmed!</h4>
            <p className="text-xs text-neutral-400 max-w-xs">
              Order ref: <span className="font-mono text-emerald-400 font-bold">#BM-UK-92817</span>
              <br />
              Confirmation and tracked DPD shipping details have been sent to {shippingForm.email}.
            </p>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left w-full text-xs space-y-1.5">
              <p className="font-semibold text-white">Delivering to:</p>
              <p className="text-neutral-400">{shippingForm.name}</p>
              <p className="text-neutral-400">{shippingForm.address}, {shippingForm.postcode}</p>
              <div className="pt-2 border-t border-neutral-800 text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>12-Month ABC Tech Warranty Activated</span>
              </div>
            </div>
            <button
              onClick={handleResetOrder}
              className="w-full py-3 rounded-xl bg-emerald-400 text-neutral-950 font-bold text-xs hover:bg-emerald-300 transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Checkout View */
          <div className="p-6 flex-grow overflow-y-auto space-y-5">
            <button
              type="button"
              onClick={() => setIsCheckingOut(false)}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              ← Back to review items
            </button>

            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Secure UK Express Checkout</span>
            </h4>

            <form onSubmit={handleFinishCheckout} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={shippingForm.name}
                  onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={shippingForm.email}
                  onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Postcode</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.postcode}
                    onChange={(e) => setShippingForm({ ...shippingForm, postcode: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Payment selector */}
              <div className="pt-2">
                <label className="block text-neutral-400 font-medium mb-2">Payment Method</label>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-medium">Apple Pay / Visa Ending 8841</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px]">Instant Encrypted</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 space-y-2">
                <div className="flex justify-between text-neutral-400">
                  <span>Order Total:</span>
                  <span className="text-base font-extrabold text-white font-mono">£{finalTotal}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-400 text-neutral-950 font-bold hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Complete Payment (£{finalTotal})</span>
                </button>
              </div>
            </form>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Your bag is empty</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Explore our certified refurbished iPhones, MacBooks, and Galaxy flagships to configure your next device.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-200 font-semibold cursor-pointer"
            >
              Start Browsing
            </button>
          </div>
        ) : (
          /* Normal Cart List */
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Environmental banner */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-xs flex items-center justify-between text-emerald-300">
              <span>Impact: {totalCo2Saved}kg CO₂e saved with this order</span>
              <Truck className="w-4 h-4" />
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex gap-3 text-xs"
                >
                  <div className="w-18 h-18 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 p-1">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-grow space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-white line-clamp-1">{item.product.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-rose-400 p-0.5 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-400 space-y-0.5">
                      <p>
                        <span className="text-neutral-200 font-medium">{item.selectedStorage}</span>
                        {' · '}
                        <span className="capitalize text-neutral-200">{item.selectedCondition}</span>
                        {' · '}
                        <span>{item.selectedColor.name}</span>
                      </p>
                      {item.selectedBattery === 'brand_new' && (
                        <p className="text-emerald-400">+ Brand New 100% Battery Installed</p>
                      )}
                      {item.selectedWarranty !== '12_months' && (
                        <p className="text-emerald-400">
                          + {item.selectedWarranty === '24_months' ? '24m Care' : '36m Protection'}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-bold text-white font-mono text-sm tabular-nums">
                        £{item.price * item.quantity}
                      </span>

                      <div className="flex items-center gap-2 border border-neutral-800 rounded-lg bg-neutral-950 px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Voucher & Promo Form */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. ATELIER20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-lg cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>}
              {appliedPromoDiscount > 0 && (
                <p className="text-[11px] text-emerald-400 mt-1">
                  ATELIER20 applied: -£{appliedPromoDiscount} off!
                </p>
              )}
            </form>
          </div>
        )}

        {/* Footer / Subtotal Area */}
        {!orderComplete && !isCheckingOut && cart.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-900/40 shrink-0 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-neutral-200">£{rawSubtotal}</span>
              </div>
              {tradeInDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Trade-In Voucher Credit</span>
                  <span className="font-mono">-£{tradeInDiscount}</span>
                </div>
              )}
              {appliedPromoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Code</span>
                  <span className="font-mono">-£{appliedPromoDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tracked UK Shipping (DPD)</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                <span>Total</span>
                <span className="text-lg font-extrabold font-mono text-emerald-400 tabular-nums">
                  £{finalTotal}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
