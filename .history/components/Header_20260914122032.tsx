'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F3D3E] text-sm font-bold text-white">M</span>
          <span>
            <span className="block text-sm font-bold leading-tight text-gray-900">Mediqo Solutions</span>
            <span className="block text-[11px] leading-tight text-gray-500">Everyday care, delivered</span>
          </span>
        </Link>
        <Link href="/cart" className="relative rounded-lg border border-gray-200 p-2 text-sm font-medium hover:bg-gray-50" aria-label="Cart">
          🛒
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#F5A524] text-[10px] font-bold text-[#0F3D3E]">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}