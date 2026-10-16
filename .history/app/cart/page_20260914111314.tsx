'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import CheckoutModal from '@/components/CheckoutModal';

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (items.length === 0) {
    return <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6"><p className="text-gray-500">Your cart is empty.</p></main>;
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Your Cart</h1>

      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">KES {item.price.toLocaleString()} each</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value, 10) || 1)}
                className="w-16 rounded-md border border-gray-200 px-2 py-1 text-center text-sm"
              />
              <button onClick={() => removeItem(item.productId)} className="text-sm text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-lg font-semibold text-gray-900">
        <span>Total</span>
        <span>KES {total.toLocaleString()}</span>
      </div>

      <button
        onClick={() => setCheckoutOpen(true)}
        className="mt-6 w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700"
      >
        Checkout on WhatsApp
      </button>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </main>
  );
}