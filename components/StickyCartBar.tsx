'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import CheckoutModal from './CheckoutModal';

export default function StickyCartBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { items, total, count, clear } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const visible = count > 0 && pathname !== '/cart';

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0F3D3E] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] sm:px-6"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <button onClick={() => router.push('/cart')} className="text-left">
                <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
                <p className="text-lg font-bold text-white">KES {total.toLocaleString()}</p>
              </button>
              <button
                onClick={() => setCheckoutOpen(true)}
                className="flex items-center gap-2 rounded-full bg-[#F5A524] px-5 py-2.5 text-sm font-semibold text-[#0F3D3E] transition-colors hover:bg-[#e2940f]"
              >
                Checkout via WhatsApp
                <span aria-hidden>💬</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} items={items} total={total} onSuccess={clear} />
    </>
  );
}