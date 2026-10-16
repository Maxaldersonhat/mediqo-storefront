'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { imageSrc, type StoreProduct } from '@/lib/api';
import CheckoutModal from './CheckoutModal';

export default function ProductCard({ product }: { product: StoreProduct }) {
  const { addItem } = useCart();
  const img = imageSrc(product.imageUrl);
  const [qty, setQty] = useState(1);
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E7E8F0] bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      {product.category && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0F3D3E] shadow-sm">
          {product.category.name}
        </span>
      )}
      <span
        className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
          product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}
      >
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </span>

      <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-[#F3F4FA]">
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-300">No image</div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{product.name}</h3>
        </Link>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs text-gray-500">{product.description}</p>
        )}

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-[10px] uppercase tracking-wide text-gray-400">KES Unit Price</span>
          <span className="text-lg font-bold text-gray-900">
            {product.price != null ? product.price.toLocaleString() : '—'}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-gray-200">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-2.5 py-1.5 text-gray-500 hover:text-gray-900" aria-label="Decrease quantity">−</button>
            <span className="w-6 text-center text-sm font-medium">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="px-2.5 py-1.5 text-gray-500 hover:text-gray-900" aria-label="Increase quantity">+</button>
          </div>
          <button
            onClick={() => {
              addItem(product, qty);
              setQty(1);
            }}
            disabled={product.price == null || !product.inStock}
            className="flex-1 rounded-lg bg-[#0F3D3E] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#14524f] disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>

        <button
          onClick={() => setQuickOpen(true)}
          disabled={product.price == null || !product.inStock}
          className="mt-2 text-xs font-medium text-[#0F3D3E] underline decoration-dotted underline-offset-2 hover:text-[#14524f] disabled:opacity-40"
        >
          Quick WhatsApp Order
        </button>
      </div>

      <CheckoutModal
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
        items={product.price != null ? [{ productId: product.id, name: product.name, price: product.price, quantity: qty }] : []}
        total={(product.price ?? 0) * qty}
      />
    </motion.div>
  );
}