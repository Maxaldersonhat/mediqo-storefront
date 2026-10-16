'use client';

import { useCart } from '@/lib/cart-context';
import type { StoreProduct } from '@/lib/api';

export default function AddToCartButton({ product }: { product: StoreProduct }) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(product)}
      disabled={product.price == null || !product.inStock}
      className="mt-6 w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 md:w-auto md:px-8"
    >
      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}