'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { StoreProduct } from '@/lib/api';
import ProductCard from './ProductCard';

type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'name';

export default function Catalogue({ products }: { products: StoreProduct[] }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('featured');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.category && set.add(p.category.name));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory) list = list.filter((p) => p.category?.name === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    const sorted = [...list];
    if (sort === 'price_asc') sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === 'price_desc') sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [products, activeCategory, search, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Live Inventory</p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">Healthcare Catalogue</h2>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search supplies, monitors…"
              className="w-56 rounded-lg border border-gray-200 bg-[#F8F9FC] py-2 pl-9 pr-3 text-sm focus:border-[#0F3D3E] focus:outline-none focus:ring-1 focus:ring-[#0F3D3E] sm:w-64"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-gray-200 bg-[#F8F9FC] px-3 py-2 text-sm focus:border-[#0F3D3E] focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => setActiveCategory(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === null ? 'bg-[#0F3D3E] text-white' : 'bg-[#F3F4FA] text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Products ({products.length})
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === c ? 'bg-[#0F3D3E] text-white' : 'bg-[#F3F4FA] text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-gray-500">No products match your search.</p>
      )}
    </section>
  );
}