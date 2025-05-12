'use client';

import { createCheckoutSession } from '@/actions/stripe-actions';
import { formatPrice } from '@/actions/utils';
import { useCartStore} from '@/stores/cart-store';
import { Loader2, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';


const freeShippingAmount = 50;

const Cart = () => {
  const {
    cartId,
    items,
    close,
    removeItem,
    updateQuantity,
    isOpen,
    syncWithUser,
    setLoaded,
    getTotalPrice,
    getTotalItems,
  } = useCartStore(
    useShallow((state) => ({
      cartId: state.cartId,
      items: state.items,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      close: state.close,
      isOpen: state.isOpen,
      syncWithUser: state.syncWithUser,
      setLoaded: state.setLoaded,
      getTotalPrice: state.getTotalPrice,
      getTotalItems: state.getTotalItems,
    }))
  );

  useEffect(() => {
    const initCart = async () => {
      await useCartStore.persist.rehydrate();
      await syncWithUser();
      setLoaded(true);
    };
    initCart();
  }, [setLoaded, syncWithUser]);

  const [loadingProceed, setLoadingProceed] = useState(false);

  const handleProceedToCheckout = async () => {
    if (!cartId || loadingProceed) return;
    setLoadingProceed(true);

    const checkoutUrl = await createCheckoutSession(cartId);

    try {
      const anyWindow = window as any;
      if (anyWindow.umami) {
        anyWindow.umami.track('proceed_to_checkout', {
          cartId,
          totalPrice: getTotalPrice(),
          currency: 'USD',
        });
      }
    } catch (error) {
      console.error("Failed to register analytics:", error);
    }

    window.location.href = checkoutUrl;
    setLoadingProceed(false);
  };

  const totalPrice = getTotalPrice();
  const remainingForFreeShipping = useMemo(() => {
    return Math.max(0, freeShippingAmount - totalPrice);
  }, [totalPrice]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-50 transition-opacity backdrop-blur-sm"
          onClick={close}
        />
      )}

      <div className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-black" />
              <h2 className="text-lg font-semibold text-black">Shopping Cart</h2>
              <span className="bg-black px-2 py-1 rounded-full text-sm font-medium text-white">
                {getTotalItems()}
              </span>
            </div>
            <button onClick={close} className="p-2 bg-stone-950 rounded-full transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">
                  Looks like you have not added any items to your cart yet!
                </p>
                <Link
                  href="/"
                  onClick={close}
                  className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {items.map((item) => {
                  const isFreeItem = item.price === 0;
                  return (
                    <div key={`cart-item-${item.id}`} className="flex gap-4 p-4 hover:bg-gray-50">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                          {isFreeItem ? (
                            <span className="text-emerald-600 font-medium">FREE</span>
                          ) : (
                            formatPrice(item.price)
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          {isFreeItem ? (
                            <div className="text-sm text-emerald-600 font-medium">Prize Item</div>
                          ) : (
                            <>
                              <select
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                className="border rounded-md px-2 py-1 text-sm bg-white text-gray-950"
                              >
                                {[...Array(10)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 text-sm hover:text-red-600"
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Checkout section */}
          {items.length > 0 && (
            <div className="border-t">
              {remainingForFreeShipping > 0 ? (
                <div className="p-4 bg-blue-50 border-b">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <span>🚚</span>
                    <span className="font-medium text-black">
                      Add {formatPrice(remainingForFreeShipping)} more for FREE shipping
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (totalPrice / freeShippingAmount) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border-b">
                  <div className="flex items-center gap-2 text-green-800">
                    <span>✨</span>
                    <span className="font-medium text-black">You have unlocked FREE shipping!</span>
                  </div>
                </div>
              )}

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-black">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  disabled={loadingProceed}
                  className="w-full bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
                >
                  {loadingProceed ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;