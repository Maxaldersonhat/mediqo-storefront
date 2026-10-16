'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { imageSrc, type StoreProduct } from '@/lib/api';

export default function ProductCard({ product }: { product: StoreProduct }) {
  const { addItem } = useCart();
  const img = imageSrc(product.imageUrl);

  return (
    <div className="group rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
          {img ? (
            <img src={img} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-300">No image</div>
          )}
        </div>
        <h3 className="mt-3 line-clamp-2 text-sm font-medium text-gray-900">{product.name}</h3>
      </Link>
      <p className="mt-1 text-sm font-semibold text-gray-900">
        {product.price != null ? `KES ${product.price.toLocaleString()}` : 'Price on request'}
      </p>
      <button
        onClick={() => addItem(product)}
        disabled={product.price == null}
        className="mt-2 w-full rounded-lg bg-gray-900 py-2 text-xs font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        Add to Cart
      </button>
    </div>
  );
}